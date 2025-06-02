
import React from "react";
import { Users, Database, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const UseCasesSection = () => {
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

  const useCases = [
    {
      title: "Mentores e infoprodutores",
      description: "automação de vendas, onboarding e suporte",
      icon: Users
    }, 
    {
      title: "E-commerces",
      description: "automação de atendimento, carrinho e funil de recuperação",
      icon: Database
    }, 
    {
      title: "Empresas de financiamento",
      description: "qualificação automática via CPF + agendamento de coldcall",
      icon: DollarSign
    }, 
    {
      title: "Negócios locais e serviços 1x1",
      description: "propostas, agendamento, follow-ups automatizados",
      icon: Clock
    }
  ];

  return (
    <section className="relative">
      <motion.div 
        className="max-w-6xl mx-auto" 
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
          className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Quem está usando</span> <span className="text-gold">Funcionários Digitais:</span>
        </motion.h2>

        <div className="mobile-card-grid-2">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="floating-card mobile-card-compact text-center hover:border-gold/40 transition-all duration-300 rounded-lg hover:-translate-y-2 min-h-[160px] md:min-h-[180px] flex flex-col justify-center"
            >
              {/* Icon at the top */}
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 md:mb-4 shrink-0">
                <useCase.icon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gold" />
              </div>
              
              {/* Content below icon */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold leading-tight text-center text-gold">
                  {useCase.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gold/80 leading-relaxed text-center">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default UseCasesSection;
