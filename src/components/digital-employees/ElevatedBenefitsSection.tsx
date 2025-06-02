
import React from "react";
import { TrendingUp, Zap, Shield, ArrowRight, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

const ElevatedBenefitsSection = () => {
  const isMobile = useIsMobile();

  const benefits = [
    {
      icon: TrendingUp,
      title: "Economia Comprovada",
      problem: "Custos fixos altos com equipe operacional",
      solution: "Redução de 60-80% nos custos com funcionários",
      result: "R$ 200k - R$ 800k economizados por ano",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30"
    },
    {
      icon: Zap,
      title: "Escalabilidade Infinita",
      problem: "Dificuldade para escalar sem contratar mais pessoas",
      solution: "Sistemas que processam volume ilimitado",
      result: "Cresça 300% sem aumentar equipe",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30"
    },
    {
      icon: Shield,
      title: "Confiabilidade Total",
      problem: "Erros humanos e inconsistências",
      solution: "Automação 24/7 com 99.9% de precisão",
      result: "Zero erros operacionais",
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30"
    }
  ];

  const videoTestimonial = {
    company: "E-commerce R$ 2M/mês",
    name: "Carlos Silva, CEO",
    result: "R$ 450k economizados em 8 meses",
    quote: "Cortamos 80% da equipe operacional. ROI de 400% no primeiro ano.",
    thumbnail: "/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png"
  };

  return (
    <section id="benefits" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm bg-gold/15 text-gold mb-6 font-semibold">
            Resultados Comprovados
          </span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}>
            <span className="text-white block mb-2">Por que Empresários Escolhem</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-green-400">
              Funcionários Digitais?
            </span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80 max-w-3xl mx-auto leading-relaxed`}>
            Veja os 3 pilares que garantem resultados excepcionais para empresas como a sua
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className={`p-8 ${benefit.bgColor} ${benefit.borderColor} border-2 hover:border-opacity-60 transition-all duration-300 rounded-2xl group relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 ${benefit.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <benefit.icon className={`w-12 h-12 ${benefit.color} mb-6`} />
                
                <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
                
                {/* Problem Statement */}
                <div className="mb-4">
                  <p className="text-sm text-red-300 font-medium mb-1">❌ Antes:</p>
                  <p className="text-foreground/70 text-sm">{benefit.problem}</p>
                </div>
                
                {/* Solution */}
                <div className="mb-4">
                  <p className="text-sm text-green-300 font-medium mb-1">✅ Depois:</p>
                  <p className="text-foreground/80">{benefit.solution}</p>
                </div>
                
                {/* Result Highlight */}
                <div className={`${benefit.bgColor} border ${benefit.borderColor} rounded-lg p-4 mt-4`}>
                  <p className={`${benefit.color} font-bold text-lg`}>{benefit.result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Testimonial Destacado */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-lg border-gold/30 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Video Thumbnail */}
              <div className="relative group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={videoTestimonial.thumbnail}
                    alt="Video Testimonial"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-gold/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-black ml-1" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-foreground/60 mt-2">
                  Clique para assistir o depoimento completo
                </p>
              </div>

              {/* Testimonial Content */}
              <div>
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-1">{videoTestimonial.name}</h4>
                  <p className="text-gold font-medium">{videoTestimonial.company}</p>
                </div>
                
                <blockquote className="text-lg italic text-foreground/90 mb-4">
                  "{videoTestimonial.quote}"
                </blockquote>
                
                <div className="bg-green-400/15 border border-green-400/30 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-bold text-xl">{videoTestimonial.result}</p>
                  <p className="text-sm text-foreground/70">em economia comprovada</p>
                </div>

                <Button 
                  className="bg-gold hover:bg-gold-light text-black font-semibold px-6 py-3 rounded-xl w-full md:w-auto"
                  onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Minha Economia Potencial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-3 rounded-full mb-6">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">
              {isMobile ? "Economia média: R$ 283k/ano" : "Economia média dos nossos clientes: R$ 283k por ano"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevatedBenefitsSection;
