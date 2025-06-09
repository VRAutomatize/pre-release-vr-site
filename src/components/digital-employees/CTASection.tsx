
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Shield, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const CTASection = () => {
  const isMobile = useIsMobile();

  const benefits = [
    "Análise gratuita dos seus processos",
    "Plano personalizado de redução de custos", 
    "Projeção exata de economia",
    "Cronograma de implementação"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-6 text-foreground leading-tight`}>
            Pronto para{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              Reduzir seus Custos
            </span>{" "}
            em 6 Dígitos?
          </h2>
          
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-foreground/80 mb-10 max-w-4xl mx-auto leading-relaxed`}>
            Agende uma consultoria executiva gratuita e descubra exatamente quanto sua empresa pode economizar com Funcionários Digitais
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-2 lg:grid-cols-4 gap-6'} mb-12`}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 bg-background/30 backdrop-blur-sm border border-gold/20 rounded-lg p-4 hover:border-gold/40 transition-colors">
              <CheckCircle className="h-5 w-5 text-gold shrink-0" />
              <span className={`${isMobile ? 'text-sm' : 'text-base'} text-foreground/90`}>{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center gap-6 mb-10 flex-wrap"
        >
          <div className="flex items-center gap-2 text-foreground/70">
            <Users className="h-5 w-5 text-green-400" />
            <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>200+ Empresas Atendidas</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>Implementação Garantida</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Clock className="h-5 w-5 text-gold" />
            <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>Resultados em 30 dias</span>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <button className={`bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-background font-bold ${isMobile ? 'px-8 py-4 text-lg w-full' : 'px-16 py-6 text-2xl'} rounded-2xl shadow-2xl hover:shadow-gold/30 transform hover:scale-105 transition-all duration-300 border-2 border-gold/20 group`}>
            <span className="flex items-center justify-center gap-3">
              Quero Minha Consultoria Gratuita
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Urgency and Risk Reversal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-lg">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>
              ⚠️ Apenas 5 consultorias disponíveis este mês
            </span>
          </div>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-foreground/60`}>
            ✅ 100% gratuito • ✅ Sem compromisso • ✅ Análise personalizada
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
