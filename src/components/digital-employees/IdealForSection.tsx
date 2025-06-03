
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
    "Querem reduzir o custo fixo mensal sem perder produtividade.",
    "Precisam escalar vendas, atendimento e processos com previsibilidade",
    "Estão gastando demais com tarefas que podem ser automatizadas",
    "Buscam padronização, eficiência e controle total da operação"
  ];

  return (
    <motion.div 
      className="max-w-6xl mx-auto text-center" 
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
        className="text-2xl md:text-3xl lg:text-5xl font-bold mb-12 md:mb-16 lg:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light"
      >
        Essa solução é ideal para negócios que:
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {idealPoints.map((point, index) => (
          <motion.div 
            key={index}
            variants={itemVariants} 
            className="floating-card p-6 md:p-8 flex items-start gap-4 md:gap-6 hover:border-gold/40 transition-all duration-300 rounded-lg text-left min-h-[120px] md:min-h-[140px]"
          >
            <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-gold shrink-0 mt-1" />
            <p className="text-base md:text-lg lg:text-xl leading-relaxed">{point}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default IdealForSection;
