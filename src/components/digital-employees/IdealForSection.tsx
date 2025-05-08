
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

  return (
    <section className="relative">
      <motion.div className="max-w-4xl mx-auto text-center mb-16" initial="hidden" whileInView="show" viewport={{
        once: true,
        amount: 0.3
      }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
          Essa solução é ideal para negócios que:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
            <CheckCircle className="h-8 w-8 text-gold shrink-0" />
            <p className="text-xl text-left">Querem reduzir o custo fixo mensal sem perder produtividade.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
            <CheckCircle className="h-8 w-8 text-gold shrink-0" />
            <p className="text-xl text-left">Precisam escalar vendas, atendimento e processos com previsibilidade</p>
          </motion.div>

          <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
            <CheckCircle className="h-8 w-8 text-gold shrink-0" />
            <p className="text-xl text-left">Estão gastando demais com tarefas que podem ser automatizadas</p>
          </motion.div>

          <motion.div variants={itemVariants} className="floating-card p-6 flex items-start gap-4 hover:border-gold/40 transition-all duration-300 rounded-lg">
            <CheckCircle className="h-8 w-8 text-gold shrink-0" />
            <p className="text-xl text-left">Buscam padronização, eficiência e controle total da operação</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default IdealForSection;
