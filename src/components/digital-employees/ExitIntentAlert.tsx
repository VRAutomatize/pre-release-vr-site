
import React, { useState, useEffect } from "react";
import { AlertTriangle, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
import { useTypeform } from "@/contexts/TypeformContext";
import { useIsMobile } from "@/hooks/useIsMobile";

const ExitIntentAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const { trackEvent } = useConversionAnalytics();
  const { openModal } = useTypeform();
  const isMobile = useIsMobile();

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
      actionTaken: 'form_modal',
      usesForm: true
    });
    
    // Close the alert and open the form modal
    setShowAlert(false);
    openModal();
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
          
          {/* Mobile-optimized Modal */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
            exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed z-50 ${
              isMobile 
                ? "bottom-0 left-0 right-0 rounded-t-3xl max-h-[90vh] overflow-y-auto" 
                : "inset-0 flex items-center justify-center p-4"
            }`}
          >
            <div className={`bg-gradient-to-r from-background/95 to-secondary/95 backdrop-blur-lg text-foreground shadow-2xl border border-gold/20 ${
              isMobile 
                ? "w-full rounded-t-3xl" 
                : "rounded-lg max-w-2xl w-full mx-auto"
            }`}>
              <div className={isMobile ? "p-6 pb-8 safe-area-pb" : "p-6"}>
                {/* Mobile handle indicator */}
                {isMobile && (
                  <div className="w-12 h-1 bg-foreground/30 rounded-full mx-auto mb-4" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <AlertTriangle className={`text-gold flex-shrink-0 ${isMobile ? "h-6 w-6" : "h-8 w-8"}`} />
                    <div className="flex-1">
                      <h3 className={`font-bold text-gold mb-2 ${isMobile ? "text-lg" : "text-xl"}`}>
                        🚨 Oportunidade única!
                      </h3>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="text-foreground/80 hover:text-gold transition-colors p-1"
                    aria-label="Fechar"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <p className={`mb-3 ${isMobile ? "text-base" : "text-lg"}`}>
                    Você está perdendo a chance de virar o jogo na sua empresa
                  </p>
                  <p className={`opacity-90 mb-6 ${isMobile ? "text-sm" : "text-sm"}`}>
                    Empresários que agem agora economizam em média <span className="text-gold font-semibold">R$ 283k/ano</span>
                  </p>
                  
                  <div className={`flex gap-3 ${isMobile ? "flex-col" : "flex-col sm:flex-row"}`}>
                    <button
                      onClick={handleCTAClick}
                      className={`bg-gold hover:bg-gold-light text-background rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                        isMobile ? "px-6 py-4 text-lg" : "px-6 py-3 text-lg"
                      }`}
                    >
                      <Calendar className="h-5 w-5" />
                      Agendar Reunião Agora
                    </button>
                    <button
                      onClick={handleClose}
                      className={`text-foreground/80 hover:text-gold transition-colors text-sm ${
                        isMobile ? "py-3" : "px-4 py-2"
                      }`}
                    >
                      Talvez depois
                    </button>
                  </div>
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
