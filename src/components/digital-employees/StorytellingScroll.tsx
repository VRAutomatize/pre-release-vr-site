
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: React.ElementType;
  stats: {
    value: string;
    label: string;
  };
}

const storySections: StorySection[] = [
  {
    id: "problem",
    title: "O Desafio",
    subtitle: "Custos Crescentes",
    content: "Empresários enfrentam custos operacionais que consomem até 70% da receita, limitando crescimento e rentabilidade.",
    icon: TrendingUp,
    stats: { value: "70%", label: "dos custos em operação" }
  },
  {
    id: "solution",
    title: "A Solução",
    subtitle: "Automação Inteligente",
    content: "Funcionários Digitais executam tarefas operacionais 24/7, reduzindo custos e aumentando eficiência drasticamente.",
    icon: Users,
    stats: { value: "24/7", label: "operação contínua" }
  },
  {
    id: "results",
    title: "Os Resultados",
    subtitle: "Economia Comprovada",
    content: "Clientes economizam em média R$ 283k por ano, com ROI superior a 400% no primeiro ano de implementação.",
    icon: DollarSign,
    stats: { value: "R$ 283k", label: "economia média anual" }
  },
  {
    id: "action",
    title: "Sua Oportunidade",
    subtitle: "Transforme Hoje",
    content: "Junte-se às 200+ empresas que já transformaram seus custos. Agende uma análise gratuita e descubra seu potencial.",
    icon: Target,
    stats: { value: "200+", label: "empresas transformadas" }
  }
];

const StorytellingScroll = React.memo(() => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % storySections.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:hidden py-8 bg-black/5">
      <div className="container-premium">
        {storySections.map((section, index) => {
          const IconComponent = section.icon;
          const isActive = activeSection === index;
          
          return (
            <motion.div
              key={section.id}
              className={`card-premium transition-all duration-500 mb-4 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
              }`}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <IconComponent className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gold mb-2">
                  {section.title}
                </h3>
                <h4 className="text-lg font-semibold text-foreground/80 mb-3">
                  {section.subtitle}
                </h4>
                <p className="text-foreground/70 mb-4 text-sm">
                  {section.content}
                </p>
                <div className="premium-glass rounded-lg p-3 inline-block">
                  <div className="text-lg font-bold text-gold">
                    {section.stats.value}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {section.stats.label}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Simple progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {storySections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-gold' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default StorytellingScroll;
