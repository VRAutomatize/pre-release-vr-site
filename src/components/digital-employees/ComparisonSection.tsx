
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
    <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-20 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{
          animationDelay: "1s"
        }} />
      </div>
      
      <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="show" viewport={{
        once: true,
        amount: 0.3
      }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Comparativo real:</span> Humanos vs Funcionários Digitais
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Human Employee - Rounded corners */}
          <motion.div variants={itemVariants} className="floating-card p-8 rounded-lg relative overflow-hidden border-red-400/20">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/5 rounded-full"></div>
            <Users className="w-16 h-16 text-red-400 mb-6" />
            <h3 className="text-2xl font-semibold mb-6">Funcionário convencional:</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                <p className="text-lg">Custo fixo mensal: <span className="font-semibold text-red-400">R$2.500+</span></p>
              </div>

              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                <p className="text-lg">Ausência, erro humano, limitação de horário</p>
              </div>

              <div className="flex items-start gap-4">
                <LineChart className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                <p className="text-lg">Baixa escalabilidade</p>
              </div>
            </div>
          </motion.div>

          {/* Digital Employee - Rounded corners */}
          <motion.div variants={itemVariants} className="floating-card p-8 rounded-lg relative overflow-hidden border-gold/20">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/5 rounded-full"></div>
            <Zap className="w-16 h-16 text-gold mb-6" />
            <h3 className="text-2xl font-semibold mb-6">Funcionário Digital:</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-gold shrink-0 mt-1" />
                <p className="text-lg">Custo único de implementação</p>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
                <p className="text-lg">Trabalha 24h/dia, sem erro ou pausa</p>
              </div>

              <div className="flex items-start gap-4">
                <LineChart className="w-6 h-6 text-gold shrink-0 mt-1" />
                <p className="text-lg">Escala ilimitada, sem dor de cabeça</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p variants={itemVariants} className="text-xl text-center mt-12 font-semibold text-gold">
          Em 12 meses, a economia pode passar dos R$100.000* — e o retorno ser múltiplas vezes maior.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
