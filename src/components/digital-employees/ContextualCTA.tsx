
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  AlertTriangle,
  Target
} from "lucide-react";
import { useBehavioralSegmentation } from "@/hooks/useBehavioralSegmentation";
import { TypeformButton } from "@/components/form/TypeformButton";

interface CTAVariant {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  icon: React.ComponentType<any>;
  urgency: "low" | "medium" | "high";
  color: string;
  bgColor: string;
}

const ContextualCTA = ({ sectionId }: { sectionId: string }) => {
  const { currentSegment, trackCTAClick } = useBehavioralSegmentation();

  // Define CTAs for different segments and contexts
  const ctaVariants: Record<string, CTAVariant[]> = {
    high_intent: [
      {
        id: "urgent_implementation",
        title: "🔥 Vagas Limitadas para Dezembro",
        description: "Apenas 3 vagas restantes para implementação em dezembro. Garante já!",
        buttonText: "Quero Garantir Minha Vaga",
        icon: AlertTriangle,
        urgency: "high",
        color: "text-red-400",
        bgColor: "bg-red-500/10 border-red-500/30"
      }
    ],
    executive: [
      {
        id: "executive_consultation",
        title: "Consultoria Executiva Personalizada",
        description: "Análise estratégica com nossos especialistas para sua empresa",
        buttonText: "Agendar Consultoria VIP",
        icon: Target,
        urgency: "medium",
        color: "text-gold",
        bgColor: "bg-gold/10 border-gold/30"
      }
    ],
    price_sensitive: [
      {
        id: "roi_calculator",
        title: "Calcule Sua Economia Exata",
        description: "Descubra quanto pode economizar por ano com automação",
        buttonText: "Calcular ROI Grátis",
        icon: Calculator,
        urgency: "medium",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/30"
      }
    ],
    feature_focused: [
      {
        id: "technical_demo",
        title: "Demo Técnica Personalizada",
        description: "Veja exatamente como funciona na prática",
        buttonText: "Ver Demo Ao Vivo",
        icon: Zap,
        urgency: "medium",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/30"
      }
    ],
    low_intent: [
      {
        id: "social_proof",
        title: "200+ Empresas Já Economizam Milhões",
        description: "Veja cases reais de transformação digital",
        buttonText: "Ver Cases de Sucesso",
        icon: Users,
        urgency: "low",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/30"
      }
    ],
    medium_intent: [
      {
        id: "consultation",
        title: "Consultoria Gratuita de 30 Minutos",
        description: "Análise personalizada do seu potencial de automação",
        buttonText: "Falar com Especialista",
        icon: Calculator,
        urgency: "medium",
        color: "text-gold",
        bgColor: "bg-gold/10 border-gold/30"
      }
    ]
  };

  // Context-specific adjustments
  const getContextualVariant = (): CTAVariant => {
    const segmentCTAs = ctaVariants[currentSegment.type] || ctaVariants.medium_intent;
    let baseCTA = segmentCTAs[0];

    // Adjust based on section context
    switch (sectionId) {
      case "roi-calculator":
        if (currentSegment.type === "price_sensitive") {
          baseCTA = {
            ...baseCTA,
            title: "💰 Resultado Impressionante?",
            description: "Vamos implementar essa economia na sua empresa",
            buttonText: "Implementar Agora"
          };
        }
        break;
      
      case "executive-assessment":
        if (currentSegment.type === "executive") {
          baseCTA = {
            ...baseCTA,
            title: "🎯 Perfil de Liderança Identificado",
            description: "Consultoria estratégica para líderes visionários",
            buttonText: "Agendar Reunião Executiva"
          };
        }
        break;
      
      case "cases":
        baseCTA = {
          ...baseCTA,
          title: "Que tal ser o próximo case de sucesso?",
          description: "Implemente a mesma solução que transformou essas empresas",
          buttonText: "Começar Transformação"
        };
        break;
      
      case "faq":
        baseCTA = {
          ...baseCTA,
          title: "Ainda tem dúvidas?",
          description: "Tire todas as dúvidas diretamente com nossos especialistas",
          buttonText: "Esclarecer Dúvidas"
        };
        break;
    }

    return baseCTA;
  };

  const cta = getContextualVariant();
  const IconComponent = cta.icon;

  const handleClick = () => {
    trackCTAClick();
  };

  // Urgency-based animations
  const getUrgencyAnimation = () => {
    switch (cta.urgency) {
      case "high":
        return {
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 0 0 rgba(239, 68, 68, 0)",
            "0 0 0 10px rgba(239, 68, 68, 0.1)",
            "0 0 0 20px rgba(239, 68, 68, 0)"
          ]
        };
      case "medium":
        return {
          scale: [1, 1.01, 1]
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={getUrgencyAnimation()}
      transition={{
        duration: cta.urgency === "high" ? 2 : 4,
        repeat: cta.urgency === "high" ? Infinity : 0
      }}
      className="my-8"
    >
      <Card className={`${cta.bgColor} border-2 ${cta.color.replace('text-', 'border-').replace('/30', '/50')} relative overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${cta.bgColor}`}>
              <IconComponent className={`h-6 w-6 ${cta.color}`} />
            </div>
            
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${cta.color} mb-2`}>
                {cta.title}
              </h3>
              <p className="text-foreground/80 mb-4">
                {cta.description}
              </p>
              
              <div className="flex items-center gap-4">
                <TypeformButton
                  onClick={handleClick}
                  className={`${
                    cta.urgency === "high" 
                      ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                      : "bg-gold hover:bg-gold-light text-background"
                  } px-6 py-3 text-base font-medium`}
                  trackingId={`contextual_cta_${cta.id}`}
                  trackingSection={sectionId}
                  trackingMetadata={{
                    segment: currentSegment.type,
                    urgency: cta.urgency,
                    ctaVariant: cta.id
                  }}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {cta.buttonText}
                </TypeformButton>
                
                {cta.urgency === "high" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Oferta por tempo limitado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Urgency indicator */}
        {cta.urgency === "high" && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-red-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 300, ease: "linear" }}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default ContextualCTA;
