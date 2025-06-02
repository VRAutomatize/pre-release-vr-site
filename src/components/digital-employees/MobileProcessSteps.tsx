
import React, { useState } from "react";
import { Database, Zap, Users, CheckCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const MobileProcessSteps = () => {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Mapeamento",
      subtitle: "Analisamos sua operação",
      description: "Identificamos processos ineficientes e oportunidades de automação na sua empresa",
      icon: Database,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Desenvolvimento", 
      subtitle: "Criamos sua solução",
      description: "Desenvolvemos um sistema automatizado personalizado para suas necessidades específicas",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    },
    {
      title: "Implementação",
      subtitle: "Substituímos processos manuais",
      description: "Colocamos seus funcionários digitais para trabalhar 24/7 com performance constante",
      icon: Users,
      color: "text-green-400", 
      bgColor: "bg-green-400/10"
    },
    {
      title: "Otimização",
      subtitle: "Design moderno e treinamento",
      description: "Interface intuitiva, onboarding completo e suporte contínuo para sua equipe",
      icon: CheckCircle,
      color: "text-gold",
      bgColor: "bg-gold/10"
    }
  ];

  if (!isMobile) return null;

  return (
    <section className="py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
          Como funciona nosso processo
        </h2>
        <p className="text-sm text-gold/80">
          4 etapas simples para transformar sua operação
        </p>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between mb-6 bg-card/50 p-1 rounded-lg">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`flex-1 py-2 px-1 text-xs font-medium rounded-md transition-all ${
              activeStep === index 
                ? 'bg-gold text-background' 
                : 'text-gold/70 hover:text-gold'
            }`}
          >
            {index + 1}. {step.title}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`${steps[activeStep].bgColor} border border-gold/20 rounded-lg p-6 text-center`}
        >
          <div className={`w-16 h-16 rounded-full ${steps[activeStep].bgColor} flex items-center justify-center mx-auto mb-4`}>
            <steps[activeStep].icon className={`h-8 w-8 ${steps[activeStep].color}`} />
          </div>
          
          <span className={`text-3xl font-bold ${steps[activeStep].color} block mb-2`}>
            {String(activeStep + 1).padStart(2, '0')}
          </span>
          
          <h3 className="text-lg font-semibold text-gold mb-2">
            {steps[activeStep].subtitle}
          </h3>
          
          <p className="text-sm text-gold/80 leading-relaxed">
            {steps[activeStep].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gold/70">Progresso</span>
          <span className="text-xs text-gold">{activeStep + 1}/{steps.length}</span>
        </div>
        <div className="w-full bg-gold/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-gold to-gold-light h-2 rounded-full transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-card/50 text-gold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Anterior
        </button>
        
        <button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-gold text-background rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
        >
          Próximo
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Timeline Visual */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div className={`w-3 h-3 rounded-full ${
                index <= activeStep ? 'bg-gold' : 'bg-gold/30'
              }`} />
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  index < activeStep ? 'bg-gold' : 'bg-gold/30'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileProcessSteps;
