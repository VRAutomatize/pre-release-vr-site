
import React from "react";
import { AlertTriangle, DollarSign, LineChart, Users, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ComparisonSection = () => {
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

  return (
    <section className="relative py-12 md:py-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-20 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{
          animationDelay: "1s"
        }} />
      </div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10 px-4 md:px-6" 
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
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-foreground"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Comparativo real:</span>
          <br className="md:hidden" />
          <span className="text-foreground"> Humanos vs Funcionários Digitais</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Human Employee */}
          <motion.div 
            variants={itemVariants} 
            className="bg-card/80 backdrop-blur-lg p-6 md:p-8 rounded-lg relative overflow-hidden border border-red-400/20 hover:border-red-400/40 transition-all duration-300"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/5 rounded-full"></div>
            <Users className="w-10 h-10 md:w-12 md:h-12 text-red-400 mb-4 relative z-10" />
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground relative z-10">Funcionário convencional:</h3>

            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Custo fixo mensal: <span className="font-semibold text-red-400">R$2.500+</span></p>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Ausência, erro humano, limitação de horário</p>
              </div>

              <div className="flex items-start gap-3">
                <LineChart className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Baixa escalabilidade</p>
              </div>
            </div>
          </motion.div>

          {/* Digital Employee */}
          <motion.div 
            variants={itemVariants} 
            className="bg-card/80 backdrop-blur-lg p-6 md:p-8 rounded-lg relative overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/5 rounded-full"></div>
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-gold mb-4 relative z-10" />
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground relative z-10">Funcionário Digital:</h3>

            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Custo único de implementação</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Trabalha 24h/dia, sem erro ou pausa</p>
              </div>

              <div className="flex items-start gap-3">
                <LineChart className="w-5 h-5 text-gold shrink-0 mt-1" />
                <p className="text-sm md:text-base text-gold/90">Escala ilimitada, sem dor de cabeça</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          variants={itemVariants} 
          className="text-base md:text-lg lg:text-xl text-center mt-8 md:mt-12 font-semibold text-gold"
        >
          Em 12 meses, a economia pode passar dos R$100.000* — e o retorno ser múltiplas vezes maior.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
