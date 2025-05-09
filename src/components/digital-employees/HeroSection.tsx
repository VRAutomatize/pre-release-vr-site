
import React from "react";
import { ArrowRight, Calculator } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useIsMobile } from "@/hooks/useIsMobile";
import { TypeformModal } from "@/components/form/TypeformModal";
import { useTypeformModal } from "@/hooks/useTypeformModal";

interface HeroSectionProps {
  calendarLink: string;
  webhookUrl?: string;
}

const HeroSection = ({ calendarLink, webhookUrl }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const { isOpen, showCalendar, openModal, closeModal, showCalendarView } = useTypeformModal();
  
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
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 sm:px-8 py-3 sm:py-4"
            >
              <Calculator className="mr-2 h-5 w-5 flex-shrink-0" /> 
              <span className="text-sm sm:text-lg">
                {isMobile ? "Calcule sua economia" : "Cálculo estimado da sua economia anual com automação"}
              </span>
              <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </PageHero>

      {/* Typeform Modal */}
      <TypeformModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        calendarLink={calendarLink}
        webhookUrl={webhookUrl}
        showCalendar={showCalendar}
        onShowCalendar={showCalendarView}
      />
    </>
  );
};

export default React.memo(HeroSection);
