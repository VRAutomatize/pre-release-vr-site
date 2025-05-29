
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
    <section className="relative py-12 md:py-16">
      <motion.div className="max-w-6xl mx-auto mobile-container-minimal" initial="hidden" whileInView="show" viewport={{
        once: true,
        amount: 0.3
      }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-20 text-center px-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Quem está usando</span> Funcionários Digitais:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="floating-card p-4 md:p-6 lg:p-8 text-center hover:border-gold/40 transition-all duration-300 rounded-lg hover:-translate-y-2 min-h-[200px] flex flex-col justify-center"
            >
              {/* Icon at the top */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 md:mb-6 shrink-0">
                <useCase.icon className="h-6 w-6 md:h-8 md:w-8 text-gold" />
              </div>
              
              {/* Content below icon */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-center">
                  {useCase.title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-foreground/70 leading-relaxed text-center max-w-none">
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
