
import React from "react";
import { Card } from "@/components/ui/card";
import { Quote, Star, TrendingUp, CheckCircle, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const PremiumSocialProof = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  const testimonials = [
    {
      company: "E-commerce de Moda",
      revenue: "R$ 2M/mês",
      savings: "R$ 380k/ano",
      quote: "Automatizamos 80% do atendimento. Reduzimos equipe de 12 para 3 pessoas.",
      author: "Marina Silva, CEO",
      rating: 5,
      highlight: "Redução de 75% nos custos"
    },
    {
      company: "Indústria Alimentícia",
      revenue: "R$ 5M/mês", 
      savings: "R$ 650k/ano",
      quote: "Sistema integrado eliminou 90% dos erros. ROI de 400% em 8 meses.",
      author: "Carlos Medeiros, Diretor",
      rating: 5,
      highlight: "ROI de 400% em 8 meses"
    },
    {
      company: "Marketplace B2B",
      revenue: "R$ 1.5M/mês",
      savings: "R$ 220k/ano",
      quote: "Melhor investimento que fizemos. Processos automáticos.",
      author: "Roberto Faria, Sócio",
      rating: 5,
      highlight: "100% automatizado"
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Empresários que já{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            escalaram sem custos
          </span>
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Cases reais de empresas com faturamento similar ao seu
        </p>
        
        {/* Trust indicators - Mais compacto */}
        <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-medium text-sm">Resultados Garantidos</span>
          </div>
          <div className="flex items-center gap-2 bg-gold/10 px-3 py-2 rounded-lg">
            <Users className="h-4 w-4 text-gold" />
            <span className="text-gold font-medium text-sm">200+ Empresas</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-400/10 px-3 py-2 rounded-lg">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">ROI Médio: 380%</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[plugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 border-gold/30 bg-background/50 backdrop-blur-lg hover:border-gold/50 transition-all h-full hover:scale-105 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="h-6 w-6 text-gold/60 mb-3" />
                  <p className="text-foreground/90 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                  
                  {/* Highlight box */}
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 mb-4">
                    <p className="text-gold font-bold text-center text-sm">{testimonial.highlight}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-bold">{testimonial.savings}</span>
                    </div>
                    <div className="text-foreground/70">
                      <p className="font-bold">{testimonial.company}</p>
                      <p className="text-gold text-sm">{testimonial.revenue}</p>
                      <p className="font-medium text-sm">{testimonial.author}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>

      {/* Bottom stats - Mais compacto */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-gold/10 to-gold-light/10 border border-gold/30 px-6 py-4 rounded-2xl inline-block shadow-lg">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gold" />
              <span className="text-gold font-bold text-lg">
                Economia média: R$ 283k/ano
              </span>
            </div>
            <div className="text-foreground/60">•</div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-bold text-lg">
                ROI médio: 380%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSocialProof;
