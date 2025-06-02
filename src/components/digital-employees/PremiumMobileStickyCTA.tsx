
import React, { useState, useEffect } from "react";
import { Calendar, Phone, ArrowRight, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const PremiumMobileStickyCTA = React.memo(() => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Mostra o CTA após rolar 50vh
      setIsVisible(scrollY > windowHeight * 0.5);

      // Detecta seção atual para contexto inteligente
      const sections = ['hero', 'benefits', 'calculator', 'social-proof'];
      const currentSectionEl = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setCurrentSection(currentSectionEl || '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const getContextualMessage = () => {
    switch (currentSection) {
      case 'calculator':
        return {
          icon: Calendar,
          primary: "Validar Análise",
          secondary: "Consultoria Gratuita",
          urgency: "Apenas 8 vagas este mês"
        };
      case 'social-proof':
        return {
          icon: Crown,
          primary: "Mesmo Resultado",
          secondary: "Agenda Executiva",
          urgency: "CEOs já economizaram R$ 85M"
        };
      case 'benefits':
        return {
          icon: Users,
          primary: "Cortar Custos Agora",
          secondary: "Falar com Especialista",
          urgency: "ROI médio: 450%"
        };
      default:
        return {
          icon: Calendar,
          primary: "Consultoria Gratuita",
          secondary: "Agenda Executiva",
          urgency: "Apenas 8 vagas restantes"
        };
    }
  };

  const handleCallClick = () => {
    window.open('tel:+554788558257', '_self');
  };

  if (!isMobile || !isVisible) return null;

  const contextual = getContextualMessage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
      <Card className="bg-black/90 backdrop-blur-xl border-2 border-gold/30 shadow-2xl">
        
        {/* Urgency Bar */}
        <div className="bg-gold/20 border-b border-gold/30 px-4 py-2 text-center">
          <p className="text-gold text-sm font-semibold flex items-center justify-center gap-2">
            <Crown className="h-4 w-4" />
            {contextual.urgency}
          </p>
        </div>

        {/* Main CTA Area */}
        <div className="p-4 space-y-3">
          
          {/* Primary CTA */}
          <ExecutiveButton
            variant="calendar"
            className="w-full bg-gold hover:bg-gold-light text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            trackingId="premium_mobile_sticky_primary"
            trackingSection="mobile_sticky_cta"
          >
            <contextual.icon className="h-5 w-5" />
            {contextual.primary}
            <ArrowRight className="h-5 w-5" />
          </ExecutiveButton>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCallClick}
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10 py-3 text-sm font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Ligar Agora
            </Button>
            
            <ExecutiveButton
              variant="whatsapp"
              className="border-gold/40 text-gold hover:bg-gold/10 py-3 text-sm font-medium rounded-lg"
              trackingId="premium_mobile_sticky_whatsapp"
              trackingSection="mobile_sticky_cta"
            >
              <Users className="h-4 w-4 mr-1" />
              WhatsApp
            </ExecutiveButton>
          </div>

          {/* Trust Elements */}
          <div className="text-center">
            <p className="text-xs text-foreground/60 leading-relaxed">
              ✓ Análise gratuita sem compromisso
              <br />
              ✓ Especialista dedicado para empresas R$ 2M+
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});

PremiumMobileStickyCTA.displayName = "PremiumMobileStickyCTA";

export default PremiumMobileStickyCTA;
