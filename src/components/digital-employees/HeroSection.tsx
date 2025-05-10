
import React from "react";
import { ArrowRight, Calculator } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeroSectionProps {
  calendarLink: string;
  webhookUrl?: string;
  openModal: () => void;
}

const HeroSection = ({ calendarLink, webhookUrl, openModal }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  
  return (
    <>
      <PageHero 
        title="Funcionários Digitais" 
        subtitle="Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais." 
        tag="A Automação Definitiva"
      >
        <div className="space-y-6 mt-6">
          <p className="text-xl font-semibold text-gold animate-fade-up" style={{
            animationDelay: "0.6s"
          }}>
            Mais produtividade. Menos custo fixo. Performance constante.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up" style={{
            animationDelay: "0.8s"
          }}>
            <button 
              onClick={openModal}
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              <Calculator className="mr-2 h-5 w-5 flex-shrink-0" /> 
              <span className={isSmallScreen ? "text-sm" : "text-base"}>
                {isMobile ? "Calcule sua economia" : "Descubra quanto sua empresa pode economizar"}
              </span>
              <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </PageHero>
    </>
  );
};

export default React.memo(HeroSection);
