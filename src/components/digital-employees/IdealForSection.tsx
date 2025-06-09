
import React from "react";
import { CheckCircle, ArrowRight, TrendingDown, Clock, Users, Zap, Target, DollarSign } from "lucide-react";
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

  const idealScenarios = [
    {
      icon: TrendingDown,
      title: "Investe em tráfego pago, mas sente que está jogando dinheiro fora",
      subtitle: "Porque os leads chegam... mas não são atendidos a tempo.",
      color: "text-red-400"
    },
    {
      icon: Users,
      title: "Tem uma equipe sobrecarregada — ou ainda responde tudo sozinho",
      subtitle: "E sabe que assim não dá pra crescer de verdade.",
      color: "text-orange-400"
    },
    {
      icon: Zap,
      title: "Já pensou em usar IA, mas travou na parte técnica",
      subtitle: "A VR Automatize resolve isso com implementação guiada e sob medida.",
      color: "text-blue-400"
    },
    {
      icon: Target,
      title: "Quer escalar seu atendimento sem contratar mais ninguém",
      subtitle: "Com IA, você vende 24/7 sem aumentar a folha nem perder qualidade.",
      color: "text-green-400"
    },
    {
      icon: DollarSign,
      title: "É dono(a) de Negócio Local, Clínica, Consultório, agência",
      subtitle: "E precisa transformar interesse em oportunidade real, todos os dias.",
      color: "text-gold"
    }
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
      {/* Header com arrow decorativo */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex justify-center mb-6">
          <ArrowRight className="h-8 w-8 md:h-12 md:w-12 text-gold animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
          Essa solução é <span className="text-gold font-black">pra você que...</span>
        </h2>
      </motion.div>

      <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
        {idealScenarios.map((scenario, index) => (
          <motion.div 
            key={index}
            variants={itemVariants} 
            className="bg-background/60 backdrop-blur-sm border border-white/10 p-6 md:p-8 flex items-start gap-4 md:gap-6 hover:border-gold/40 hover:bg-background/80 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:shadow-gold/10 group text-left"
          >
            <div className="shrink-0 mt-1">
              <scenario.icon className={`h-6 w-6 md:h-8 md:w-8 ${scenario.color} group-hover:scale-110 transition-transform duration-300`} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300 mb-2">
                {scenario.title}
              </h3>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                {scenario.subtitle}
              </p>
            </div>
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
