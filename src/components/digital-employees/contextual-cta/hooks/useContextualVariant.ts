
import { CTAVariant, SegmentType } from "../types";
import { ctaVariants } from "../ctaVariants";

export const useContextualVariant = (
  currentSegmentType: SegmentType,
  sectionId: string
): CTAVariant => {
  const segmentCTAs = ctaVariants[currentSegmentType] || ctaVariants.medium_intent;
  let baseCTA = segmentCTAs[0];

  // Adjust based on section context
  switch (sectionId) {
    case "roi-calculator":
      if (currentSegmentType === "price_sensitive") {
        baseCTA = {
          ...baseCTA,
          title: "💰 Resultado Impressionante?",
          description: "Vamos implementar essa economia na sua empresa",
          buttonText: "Implementar Agora"
        };
      }
      break;
    
    case "executive-assessment":
      if (currentSegmentType === "executive") {
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
