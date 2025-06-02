
import React, { useEffect, useState } from "react";
import { Calculator, TrendingUp, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { TypeformButton } from "@/components/form/TypeformButton";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";

const MobileOptimizedHero = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isMobile) return null;

  const statsData = [
    { icon: Users, value: "200+", label: "Empresas", color: "text-gold" },
    { icon: TrendingUp, value: "R$ 283k", label: "Economia/ano", color: "text-green-400" },
    { icon: Calculator, value: "380%", label: "ROI médio", color: "text-blue-400" }
  ];

  return (
    <section className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-b from-background to-background/95 flex flex-col justify-center">
      {/* Hero Content */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-block"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium border border-gold/20">
            🚀 A Automação Definitiva
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-3xl font-bold leading-tight space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Reduza 60% dos
          </div>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Custos Fixos
          </div>
          <div className="text-lg text-gold/90 font-normal mt-2">
            com Funcionários Digitais
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base text-gold/80 leading-relaxed max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Sistemas que trabalham 24/7 substituindo processos operacionais. 
          <span className="font-semibold text-gold"> Sem pausas, sem oscilações.</span>
        </motion.p>

        {/* Statistics Cards */}
        <motion.div 
          className="space-y-3 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-gold/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm text-gold/90 font-medium">{stat.label}</span>
              </div>
              <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          className="bg-gold/10 border border-gold/20 rounded-lg p-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <p className="text-lg font-semibold text-gold mb-1">
            Performance constante.
          </p>
          <p className="text-base text-gold/80">
            Custo reduzido. Escalabilidade infinita.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="space-y-3 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {/* Primary CTA */}
          <ExecutiveButton
            variant="calendar"
            className="w-full bg-gold hover:bg-gold-light text-background py-4 text-base font-semibold rounded-lg flex items-center justify-center gap-2"
            trackingId="mobile_hero_executive"
            trackingSection="hero_mobile"
          >
            Reunião Executiva Gratuita
            <ArrowRight className="h-4 w-4" />
          </ExecutiveButton>

          {/* Secondary CTA */}
          <TypeformButton
            className="w-full bg-transparent border-2 border-gold text-gold hover:bg-gold/10 py-4 text-base font-medium rounded-lg"
            trackingId="mobile_hero_typeform"
            trackingSection="hero_mobile"
          >
            Calcular Minha Economia
          </TypeformButton>

          {/* Urgency Element */}
          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Apenas 5 vagas este mês</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileOptimizedHero;
