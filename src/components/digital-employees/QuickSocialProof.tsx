
import React from "react";
import { Star, TrendingUp, Users, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const QuickSocialProof = () => {
  const isMobile = useIsMobile();

  const stats = [
    {
      icon: Users,
      value: "200+",
      label: "Empresas Atendidas",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      value: "R$ 283k",
      label: "Economia Média/Ano",
      color: "text-green-400"
    },
    {
      icon: Star,
      value: "380%",
      label: "ROI Médio",
      color: "text-yellow-400"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Funcionamento",
      color: "text-purple-400"
    }
  ];

  const testimonials = [
    {
      text: "Reduzimos 12 funcionários para 3. Economia de R$ 450k/ano.",
      company: "E-commerce R$ 2M/mês",
      rating: 5
    },
    {
      text: "ROI de 400% em 8 meses. Melhor investimento que fizemos.",
      company: "Marketplace B2B",
      rating: 5
    },
    {
      text: "90% dos erros operacionais eliminados com a automação.",
      company: "Indústria Alimentícia",
      rating: 5
    }
  ];

  return (
    <section className="section-spacing">
      <div className="mobile-container-tight">
        {/* Stats Grid */}
        <div className="mobile-card-grid-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card/80 backdrop-blur-lg border border-gold/20 rounded-lg mobile-card-compact text-center hover:border-gold/30 transition-colors"
            >
              <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-lg md:text-xl lg:text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-foreground/80 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Testimonials */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-center mb-4 text-gold">
            {isMobile ? "O que nossos clientes dizem:" : "Resultados reais de empresários como você:"}
          </h3>
          
          <div className="mobile-card-grid gap-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card/80 backdrop-blur-lg border border-gold/20 rounded-lg mobile-card-compact hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 mb-2 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-xs text-foreground/70">
                  {testimonial.company}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {isMobile ? "Implementação garantida" : "Implementação garantida ou dinheiro de volta"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSocialProof;
