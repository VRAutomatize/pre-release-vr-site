
import React, { useState } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { TypeformButton } from "@/components/form/TypeformButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const MobileStickyCTA = () => {
  const isMobile = useIsMobile();
  const [showOptions, setShowOptions] = useState(false);

  if (!isMobile) return null;

  return (
    <>
      {/* Backdrop */}
      {showOptions && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowOptions(false)}
        />
      )}

      {/* Options Panel */}
      {showOptions && (
        <div className="fixed bottom-20 left-4 right-4 bg-background/95 backdrop-blur-lg border border-gold/20 rounded-lg p-4 z-50 space-y-3">
          <h3 className="text-lg font-semibold text-gold mb-4">Escolha sua opção:</h3>
          
          {/* Executive Options */}
          <div className="space-y-2">
            <p className="text-sm text-foreground/70">Para empresários (R$ 500k+/mês):</p>
            <div className="grid grid-cols-2 gap-2">
              <ExecutiveButton
                icon={Calendar}
                variant="calendar"
                trackingId="mobile_executive_calendar"
                trackingSection="mobile_sticky"
                className="text-xs py-2 px-3"
              >
                Reunião
              </ExecutiveButton>
              <ExecutiveButton
                icon={MessageSquare}
                variant="whatsapp"
                trackingId="mobile_executive_whatsapp"
                trackingSection="mobile_sticky"
                className="text-xs py-2 px-3"
              >
                WhatsApp
              </ExecutiveButton>
            </div>
          </div>

          {/* Standard Option */}
          <div className="pt-2 border-t border-gold/20">
            <TypeformButton
              className="w-full bg-gold hover:bg-gold-light text-background py-3"
              trackingId="mobile_standard_flow"
              trackingSection="mobile_sticky"
            >
              Análise Gratuita
            </TypeformButton>
          </div>
        </div>
      )}

      {/* Main CTA Button */}
      <div className="fixed bottom-4 left-4 right-4 z-40">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-background font-bold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="h-5 w-5" />
          {showOptions ? "Fechar opções" : "Quero começar agora"}
        </button>
      </div>
    </>
  );
};

export default MobileStickyCTA;
