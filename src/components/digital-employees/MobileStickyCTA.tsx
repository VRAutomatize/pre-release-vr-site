
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

      {/* Options Panel - Compacto */}
      {showOptions && (
        <div className="fixed bottom-16 left-3 right-3 glass-blur border border-gold/20 rounded-lg p-3 z-50 space-y-2">
          <h3 className="text-base font-semibold text-gold mb-2">Escolha sua opção:</h3>
          
          {/* Executive Options - Mais compacto */}
          <div className="space-y-1">
            <p className="text-xs text-foreground/70">Para empresários (R$ 500k+/mês):</p>
            <div className="grid grid-cols-2 gap-1.5">
              <ExecutiveButton
                icon={Calendar}
                variant="calendar"
                trackingId="mobile_executive_calendar"
                trackingSection="mobile_sticky"
                className="text-xs py-1.5 px-2"
              >
                Reunião
              </ExecutiveButton>
              <ExecutiveButton
                icon={MessageSquare}
                variant="whatsapp"
                trackingId="mobile_executive_whatsapp"
                trackingSection="mobile_sticky"
                className="text-xs py-1.5 px-2"
              >
                WhatsApp
              </ExecutiveButton>
            </div>
          </div>

          {/* Standard Option - Mais compacto */}
          <div className="pt-1.5 border-t border-gold/20">
            <TypeformButton
              className="w-full bg-gold hover:bg-gold-light text-background py-2 text-sm"
              trackingId="mobile_standard_flow"
              trackingSection="mobile_sticky"
            >
              Análise Gratuita
            </TypeformButton>
          </div>
        </div>
      )}

      {/* Main CTA Button - Significativamente menor */}
      <div className="fixed bottom-3 left-3 right-3 z-40">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-full bg-gradient-to-r from-gold to-gold-light text-background font-semibold py-2.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          <MessageSquare className="h-4 w-4" />
          {showOptions ? "Fechar" : "Começar agora"}
        </button>
      </div>
    </>
  );
};

export default MobileStickyCTA;
