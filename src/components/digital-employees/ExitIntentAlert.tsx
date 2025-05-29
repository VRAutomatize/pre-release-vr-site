
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
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Centered Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-r from-background/95 to-secondary/95 backdrop-blur-lg text-foreground shadow-2xl border border-gold/20 rounded-lg max-w-2xl w-full mx-auto">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-gold flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-gold">
                      🚨 Oportunidade única!
                    </h3>
                    <p className="text-lg mb-3">
                      Você está perdendo a chance de virar o jogo na sua empresa
                    </p>
                    <p className="text-sm opacity-90 mb-6">
                      Empresários que agem agora economizam em média <span className="text-gold font-semibold">R$ 283k/ano</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://cal.com/vrautomatize/reuniao-executiva"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCTAClick}
                        className="bg-gold hover:bg-gold-light text-background px-6 py-3 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="h-5 w-5" />
                        Agendar Reunião Agora
                      </a>
                      <button
                        onClick={handleClose}
                        className="text-foreground/80 hover:text-gold transition-colors px-4 py-2 text-sm"
                      >
                        Talvez depois
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="text-foreground/80 hover:text-gold transition-colors p-1 ml-2"
                    aria-label="Fechar"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentAlert;
