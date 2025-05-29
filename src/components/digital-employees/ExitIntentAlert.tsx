
import React, { useState, useEffect } from "react";
import { AlertTriangle, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";

const ExitIntentAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const { trackEvent } = useConversionAnalytics();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the window
      if (e.clientY <= 0 && !hasTriggered && !showAlert) {
        setShowAlert(true);
        setHasTriggered(true);
        trackEvent('exit_intent_triggered', 'mouse_leave', 'exit_alert', 'exit_intent', {
          timeOnPage: Date.now() - pageLoadTime,
          triggerLocation: 'top_exit'
        });
      }
    };

    // Add a small delay to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered, showAlert, trackEvent, pageLoadTime]);

  const handleClose = () => {
    setShowAlert(false);
    trackEvent('exit_intent_dismissed', 'click', 'close_button', 'exit_intent');
  };

  const handleCTAClick = () => {
    trackEvent('exit_intent_cta_click', 'click', 'cta_button', 'exit_intent', {
      actionTaken: 'executive_meeting'
    });
    // Don't close automatically, let user navigate
  };

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-lg text-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <AlertTriangle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">
                  🚨 <strong>Oportunidade única!</strong> Você está perdendo a chance de virar o jogo na sua empresa
                </p>
                <p className="text-xs md:text-sm opacity-90 mt-1">
                  Empresários que agem agora economizam em média R$ 283k/ano
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 ml-4">
              <a
                href="https://cal.com/vrautomatize/reuniao-executiva"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCTAClick}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="h-4 w-4" />
                Agendar Agora
              </a>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentAlert;
