
import React from "react";
import { Card } from "@/components/ui/card";
import { Quote, Star, TrendingUp } from "lucide-react";
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
      company: "Empresa de E-commerce",
      revenue: "R$ 2M/mês",
      savings: "R$ 180k/ano",
      quote: "Automatizamos 80% do atendimento. Reduzimos equipe de 12 para 3 pessoas.",
      author: "CEO",
      rating: 5
    },
    {
      company: "Indústria Alimentícia",
      revenue: "R$ 5M/mês", 
      savings: "R$ 450k/ano",
      quote: "Sistema integrado com ERP reduziu 90% dos erros operacionais.",
      author: "Diretor de Operações",
      rating: 5
    },
    {
      company: "Marketplace B2B",
      revenue: "R$ 1.2M/mês",
      savings: "R$ 220k/ano",
      quote: "ROI de 400% em 8 meses. Melhor investimento que fizemos.",
      author: "Sócio-fundador",
      rating: 5
    },
    {
      company: "Rede de Franquias",
      revenue: "R$ 3.5M/mês",
      savings: "R$ 320k/ano",
      quote: "Padronizamos processos em 45 lojas. Eficiência operacional aumentou 300%.",
      author: "Diretor de Expansão",
      rating: 5
    },
    {
      company: "Distribuidora Nacional",
      revenue: "R$ 8M/mês",
      savings: "R$ 680k/ano",
      quote: "Integração com fornecedores automatizada. Zero retrabalho na logística.",
      author: "Gerente Comercial",
      rating: 5
    },
    {
      company: "Consultoria Empresarial",
      revenue: "R$ 900k/mês",
      savings: "R$ 150k/ano",
      quote: "Relatórios que levavam dias agora são gerados em minutos.",
      author: "Sócia-fundadora",
      rating: 5
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
          Empresários que já economizam 6 dígitos
        </h2>
        <p className="text-xl text-foreground/80">
          Cases reais de empresas com faturamento similar ao seu
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
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
                <Card className="p-6 border-gold/20 bg-black/30 backdrop-blur-lg hover:border-gold/40 transition-all h-full">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="h-6 w-6 text-gold/60 mb-3" />
                  <p className="text-foreground/90 mb-4 italic">"{testimonial.quote}"</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold">Economia: {testimonial.savings}</span>
                    </div>
                    <div className="text-sm text-foreground/70">
                      <p className="font-medium">{testimonial.company}</p>
                      <p>Faturamento: {testimonial.revenue}</p>
                      <p>{testimonial.author}</p>
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

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-gold/10 px-6 py-3 rounded-full">
          <TrendingUp className="h-5 w-5 text-gold" />
          <span className="text-gold font-semibold">
            Economia média: R$ 283k/ano | ROI médio: 380%
          </span>
        </div>
      </div>
    </section>
  );
};

export default PremiumSocialProof;
