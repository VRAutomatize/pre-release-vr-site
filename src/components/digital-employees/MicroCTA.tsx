
import React from "react";
import { ArrowRight, MessageSquare, Calendar } from "lucide-react";
import { TypeformButton } from "@/components/form/TypeformButton";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MicroCTAProps {
  variant?: "default" | "urgency" | "executive" | "calculator";
  title?: string;
  description?: string;
  className?: string;
}

const MicroCTA = ({ 
  variant = "default", 
  title,
  description,
  className = ""
}: MicroCTAProps) => {
  const isMobile = useIsMobile();

  const variants = {
    default: {
      title: title || (isMobile ? "Quer economizar assim também?" : "Interessado em economizar centenas de milhares?"),
      description: description || (isMobile ? "Começar agora" : "Agende uma análise gratuita e descubra seu potencial de economia"),
      bgColor: "bg-gold/5",
      borderColor: "border-gold/20"
    },
    urgency: {
      title: title || (isMobile ? "Apenas 5 vagas restantes" : "Últimas vagas para consultoria executiva"),
      description: description || (isMobile ? "Garantir minha vaga agora" : "Reserve sua vaga antes que esgote"),
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/20"
    },
    executive: {
      title: title || (isMobile ? "Empresa fatura +R$ 500k/mês?" : "Sua empresa fatura mais de R$ 500k/mês?"),
      description: description || (isMobile ? "Reunião executiva exclusiva" : "Agende reunião executiva personalizada"),
      bgColor: "bg-purple-500/5",
      borderColor: "border-purple-500/20"
    },
    calculator: {
      title: title || (isMobile ? "Calcule sua economia" : "Quanto sua empresa pode economizar?"),
      description: description || (isMobile ? "Simulação rápida e gratuita" : "Faça uma simulação rápida e descubra"),
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/20"
    }
  };

  const config = variants[variant];

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl mobile-card-compact text-center backdrop-blur-sm ${className}`}>
      <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2 text-foreground">
        {config.title}
      </h3>
      <p className="text-foreground/70 mb-4 text-sm md:text-base">
        {config.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {variant === "executive" ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <ExecutiveButton
              icon={Calendar}
              variant="calendar"
              trackingId={`micro_cta_${variant}_calendar`}
              trackingSection="micro_cta"
              className="text-sm px-4 py-2 w-full sm:w-auto"
            >
              {isMobile ? "Agendar" : "Reunião Executiva"}
            </ExecutiveButton>
            <ExecutiveButton
              icon={MessageSquare}
              variant="whatsapp"
              trackingId={`micro_cta_${variant}_whatsapp`}
              trackingSection="micro_cta"
              className="text-sm px-4 py-2 w-full sm:w-auto"
            >
              {isMobile ? "WhatsApp" : "Falar no WhatsApp"}
            </ExecutiveButton>
          </div>
        ) : (
          <TypeformButton
            className="bg-gold hover:bg-gold-light text-background px-6 py-3 text-sm md:text-base rounded-lg transition-all duration-300 flex items-center gap-2 w-full sm:w-auto max-w-none"
            trackingId={`micro_cta_${variant}`}
            trackingSection="micro_cta"
          >
            {variant === "urgency" ? "Garantir Vaga" : variant === "calculator" ? "Calcular Economia" : "Começar"}
            <ArrowRight className="h-4 w-4" />
          </TypeformButton>
        )}
      </div>
    </div>
  );
};

export default MicroCTA;
