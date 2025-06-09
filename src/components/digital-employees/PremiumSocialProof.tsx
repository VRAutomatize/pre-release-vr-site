
import React from "react";
import { Card } from "@/components/ui/card";
import { Quote, Star, TrendingUp, CheckCircle, Users, Play } from "lucide-react";
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
      company: "Clínica Odontológica",
      industry: "Saúde", 
      quote: "Antes eu perdia leads porque não conseguia atender todo mundo na hora. Agora a IA atende, qualifica e só me chama quando é lead qualificado. Aumento de 280% nos agendamentos.",
      author: "Dr. Carlos Mendes",
      rating: 5,
      highlight: "280% mais agendamentos",
      results: "De 12 para 45 agendamentos/mês"
    },
    {
      company: "Agência de Marketing", 
      industry: "Serviços",
      quote: "A IA entende exatamente o perfil de cliente que queremos. Ela fala como nossa equipe e filtra só os leads que valem a pena. Triplicamos o faturamento sem contratar ninguém.",
      author: "Marina Silva, CEO",
      rating: 5,
      highlight: "3x o faturamento",
      results: "Sem aumentar equipe"
    },
    {
      company: "E-commerce Fitness",
      industry: "Varejo Online",
      quote: "Melhor investimento que fizemos. A IA trabalha 24h, nunca perde um lead e ainda consegue vender produtos complementares. ROI foi absurdo.",
      author: "Roberto Faria, Fundador",
      rating: 5,
      highlight: "ROI de 450%",
      results: "Vendas 24/7 automatizadas"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Veja quem <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light font-black">aplicou o método</span> tem a dizer
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-6">
          Resultados reais de empresários que implementaram nossa IA
        </p>

        {/* Video depoimento placeholder */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative bg-background/40 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-gold ml-1" />
              </div>
            </div>
            <p className="text-foreground/80 italic mb-2">
              "Depoimento em vídeo - Resultados reais"
            </p>
            <p className="text-sm text-foreground/60">
              Clique para assistir casos de sucesso
            </p>
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
                  
                  {/* Highlight box - mais conversacional */}
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 mb-4">
                    <p className="text-gold font-bold text-center text-sm">{testimonial.highlight}</p>
                    <p className="text-foreground/70 text-xs text-center mt-1">{testimonial.results}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-foreground/70">
                      <p className="font-bold text-foreground">{testimonial.company}</p>
                      <p className="text-gold text-sm">{testimonial.industry}</p>
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

      {/* Sistema próprio - Nova seção */}
      <div className="mt-16 md:mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Sistema próprio. Estrutura escalável. <span className="text-gold">Zero dor de cabeça.</span>
          </h3>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
            A VR Automatize não é mais um chatbot improvisado. Nós temos um sistema estável, seguro e desenvolvido para crescer com você.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: CheckCircle, text: "Integrações robustas" },
              { icon: TrendingUp, text: "Monitoramento em tempo real" },
              { icon: Users, text: "Atualizações constantes" },
              { icon: Star, text: "Performance testada" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="h-8 w-8 text-gold mx-auto mb-2" />
                <p className="text-sm md:text-base text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>
          
          <p className="text-base md:text-lg text-foreground/70 mt-8 max-w-2xl mx-auto">
            Você não está contratando só uma IA. Está adquirindo uma estrutura pronta para escalar com seu negócio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumSocialProof;
