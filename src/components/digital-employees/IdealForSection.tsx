
import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const IdealForSection = () => {
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

  const idealPoints = [
    "Têm muito processo manual que consome tempo e recursos",
    "Querem escalar sem aumentar o quadro de funcionários",
    "Precisam de mais previsibilidade e controle nos resultados",
    "Buscam reduzir custos operacionais de forma inteligente"
  ];

  return (
    <motion.div 
      className="max-w-7xl mx-auto text-center" 
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
        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 lg:mb-12 text-foreground"
      >
        Essa solução é ideal para negócios que:
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
        {idealPoints.map((point, index) => (
          <motion.div 
            key={index}
            variants={itemVariants} 
            className="bg-background/60 backdrop-blur-sm border border-gold/20 p-8 md:p-10 flex items-start gap-6 hover:border-gold/40 hover:bg-background/80 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:shadow-gold/10 group"
          >
            <div className="shrink-0 mt-1">
              <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-gold group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-left text-foreground/90 group-hover:text-foreground transition-colors duration-300 font-medium">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to action text */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 md:mt-16 lg:mt-20"
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gold mb-4">
          Se você se identificou com algum desses pontos...
        </p>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          É hora de descobrir como os Funcionários Digitais podem transformar sua operação
        </p>
      </motion.div>
    </motion.div>
  );
};

export default IdealForSection;
