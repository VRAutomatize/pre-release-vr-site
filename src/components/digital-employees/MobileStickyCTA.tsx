
import React, { useState, useEffect } from "react";
import { MessageSquare, Calendar, TrendingUp, Users } from "lucide-react";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { TypeformButton } from "@/components/form/TypeformButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const MobileStickyCTA = () => {
  const isMobile = useIsMobile();
  const [showOptions, setShowOptions] = useState(false);
  const [ctaVariant, setCTAVariant] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // CTA variants based on scroll position
  const ctaVariants = [
    {
      text: "Começar agora",
      subtitle: "",
      icon: MessageSquare,
      bgGradient: "from-gold to-gold-light",
      textColor: "text-background" // Dark text for gold background
    },
    {
      text: "Economizar agora", 
      subtitle: "Média: R$ 283k/ano",
      icon: TrendingUp,
      bgGradient: "from-green-500 to-green-600",
      textColor: "text-white" // White text for green background
    },
    {
      text: "Juntar-se a 200+",
      subtitle: "Empresas que economizam",
      icon: Users,
      bgGradient: "from-blue-500 to-blue-600",
      textColor: "text-white" // White text for blue background
    },
    {
      text: "Última chance",
      subtitle: "5 vagas restantes",
      icon: Calendar,
      bgGradient: "from-red-500 to-red-600",
      textColor: "text-white" // White text for red background
    }
  ];

  // Track scroll progress and change CTA variant
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setScrollProgress(progress);
      
      // Change CTA variant based on scroll progress
      if (progress < 0.25) setCTAVariant(0);
      else if (progress < 0.5) setCTAVariant(1);
      else if (progress < 0.75) setCTAVariant(2);
      else setCTAVariant(3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isMobile) return null;

  const currentVariant = ctaVariants[ctaVariant];

  return (
    <>
      {/* Backdrop */}
      {showOptions && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowOptions(false)}
        />
      )}

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20">
        <div 
          className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Options Panel - Mais compacto e otimizado */}
      {showOptions && (
        <div className="fixed bottom-16 left-3 right-3 glass-blur border border-gold/20 rounded-lg p-3 z-50 space-y-2 animate-slide-up">
          <h3 className="text-base font-semibold text-gold mb-2">Como prefere começar?</h3>
          
          {/* Executive Options */}
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
                Reunião VIP
              </ExecutiveButton>
              <ExecutiveButton
                icon={MessageSquare}
                variant="whatsapp"
                trackingId="mobile_executive_whatsapp"
                trackingSection="mobile_sticky"
                className="text-xs py-1.5 px-2"
              >
                WhatsApp VIP
              </ExecutiveButton>
            </div>
          </div>

          {/* Standard Option */}
          <div className="pt-1.5 border-t border-gold/20">
            <TypeformButton
              className="w-full bg-gold hover:bg-gold-light text-background py-2 text-sm"
              trackingId="mobile_standard_flow"
              trackingSection="mobile_sticky"
            >
              Começar (15min)
            </TypeformButton>
          </div>
          
          {/* Quick stats */}
          <div className="pt-1.5 border-t border-gold/20">
            <div className="flex justify-between text-xs text-foreground/60">
              <span>200+ empresas</span>
              <span>R$ 283k economia média</span>
              <span>5 vagas restantes</span>
            </div>
          </div>
        </div>
      )}

      {/* Main CTA Button - Dinâmico baseado no scroll */}
      <div className="fixed bottom-3 left-3 right-3 z-40">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`w-full bg-gradient-to-r ${currentVariant.bgGradient} ${currentVariant.textColor} font-semibold py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm transition-all duration-500 transform ${showOptions ? 'scale-95' : 'hover:scale-105'}`}
        >
          <currentVariant.icon className="h-4 w-4" />
          <div className="text-center">
            <div>{showOptions ? "Fechar" : currentVariant.text}</div>
            {!showOptions && currentVariant.subtitle && (
              <div className="text-xs opacity-90">{currentVariant.subtitle}</div>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default MobileStickyCTA;
