
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
    <section className="relative py-16">
      <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="show" viewport={{
        once: true,
        amount: 0.3
      }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
          Como funciona nosso processo:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="floating-card p-8 flex flex-col items-center text-center hover:border-gold/40 transition-all duration-300 relative h-full rounded-lg hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8">
                <step.icon className="h-8 w-8 text-gold" />
              </div>
              <span className="text-gold font-bold text-6xl absolute -top-12 -left-3 opacity-10">0{index + 1}</span>
              <p className="text-lg">{step.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
