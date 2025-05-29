
import React from "react";
import { Database, Zap, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProcessSection = () => {
  // Animation variants for staggered elements
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  };

  const steps = [
    {
      title: "Mapeamos os pontos ineficientes da sua operação",
      icon: Database,
      delay: 0
    }, 
    {
      title: "Criamos um sistema automatizado sob medida",
      icon: Zap,
      delay: 0.2
    }, 
    {
      title: "Substituímos o trabalho manual por uma máquina de performance constante",
      icon: Users,
      delay: 0.4
    }, 
    {
      title: "Tudo isso com design moderno, onboarding guiado e zero fricção pra sua equipe",
      icon: CheckCircle,
      delay: 0.6
    }
  ];

  return (
    <section className="relative">
      <motion.div 
        className="max-w-5xl mx-auto" 
        initial="hidden" 
        whileInView="show" 
        viewport={{
          once: true,
          amount: 0.3
        }} 
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl md:text-3xl lg:text-5xl font-bold mb-12 md:mb-16 lg:mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light"
        >
          Como funciona nosso processo:
        </motion.h2>

        <div className="mobile-card-grid-4">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="floating-card mobile-card-compact flex flex-col items-center text-center hover:border-gold/40 transition-all duration-300 relative h-full rounded-lg hover:-translate-y-2 min-h-[180px] md:min-h-[200px]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 md:mb-6">
                <step.icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-gold" />
              </div>
              <span className="text-gold font-bold text-4xl md:text-5xl lg:text-6xl absolute -top-8 md:-top-12 -left-2 md:-left-3 opacity-10">0{index + 1}</span>
              <p className="text-sm md:text-base lg:text-lg leading-tight">{step.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
