
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
    <section className="relative py-16">
      <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="show" viewport={{
        once: true,
        amount: 0.3
      }} variants={containerVariants}>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-20 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Quem está usando</span> Funcionários Digitais:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="floating-card p-8 flex items-start gap-6 hover:border-gold/40 transition-all duration-300 rounded-lg hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <useCase.icon className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-foreground/70 text-lg">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default UseCasesSection;
