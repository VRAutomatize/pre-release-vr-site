
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { useEnhancedConversionAnalytics } from "@/hooks/useEnhancedConversionAnalytics";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface ProgressTrackerProps {
  variant?: 'mobile' | 'desktop';
}

const ProgressTracker = ({ variant = 'mobile' }: ProgressTrackerProps) => {
  const { trackEvent } = useEnhancedConversionAnalytics();
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'landing',
      title: 'Descoberta',
      description: 'Conhecendo a solução',
      completed: true,
      current: false
    },
    {
      id: 'calculator',
      title: 'Cálculo ROI',
      description: 'Simulando economia',
      completed: false,
      current: false
    },
    {
      id: 'assessment',
      title: 'Assessment',
      description: 'Perfil da empresa',
      completed: false,
      current: false
    },
    {
      id: 'comparison',
      title: 'Comparação',
      description: 'Antes vs Depois',
      completed: false,
      current: false
    },
    {
      id: 'meeting',
      title: 'Reunião',
      description: 'Agendar consultoria',
      completed: false,
      current: false
    }
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Simular progresso baseado no scroll e interações
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition + windowHeight) / documentHeight;

      let newStepIndex = 0;
      if (scrollPercentage > 0.2) newStepIndex = 1;
      if (scrollPercentage > 0.4) newStepIndex = 2;
      if (scrollPercentage > 0.6) newStepIndex = 3;
      if (scrollPercentage > 0.8) newStepIndex = 4;

      if (newStepIndex !== currentStepIndex) {
        setCurrentStepIndex(newStepIndex);
        updateSteps(newStepIndex);
        
        trackEvent('progress_step_reached', 'progress', `step_${newStepIndex}`, 'interactive', {
          stepIndex: newStepIndex,
          scrollPercentage: scrollPercentage * 100
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStepIndex, trackEvent]);

  const updateSteps = (activeIndex: number) => {
    setSteps(prevSteps => 
      prevSteps.map((step, index) => ({
        ...step,
        completed: index < activeIndex,
        current: index === activeIndex
      }))
    );
  };

  if (variant === 'desktop') {
    return (
      <div className="hidden md:block fixed top-1/2 right-4 transform -translate-y-1/2 z-40">
        <div className="bg-background/80 backdrop-blur-lg border border-gold/20 rounded-lg p-4 shadow-lg">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gold text-center">Sua Jornada</h3>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                    step.current ? 'bg-gold/20 border border-gold/30' :
                    step.completed ? 'bg-green-500/10' : 'bg-background/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : step.current ? (
                      <div className="h-5 w-5 rounded-full border-2 border-gold bg-gold/20" />
                    ) : (
                      <Circle className="h-5 w-5 text-foreground/40" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${
                      step.current ? 'text-gold' :
                      step.completed ? 'text-green-400' : 'text-foreground/60'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {step.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-background/50 rounded-full h-2">
                <motion.div
                  className="bg-gold rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-xs text-center text-foreground/60 mt-1">
                {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% completo
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version - bottom sticky
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-background/90 backdrop-blur-lg border border-gold/20 rounded-lg p-4 shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gold">Sua Jornada</h3>
          <span className="text-xs text-foreground/60">
            {currentStepIndex + 1}/{steps.length}
          </span>
        </div>
        
        {/* Current Step */}
        <div className="mb-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {steps[currentStepIndex]?.completed ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gold bg-gold/20" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gold">
                {steps[currentStepIndex]?.title}
              </div>
              <div className="text-xs text-foreground/60">
                {steps[currentStepIndex]?.description}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-background/50 rounded-full h-2">
            <motion.div
              className="bg-gold rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Next Step Preview */}
          {currentStepIndex < steps.length - 1 && (
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <span>Próximo:</span>
              <ArrowRight className="h-3 w-3" />
              <span>{steps[currentStepIndex + 1]?.title}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
