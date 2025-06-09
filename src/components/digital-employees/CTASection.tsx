
import React from "react";
import { Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { TypeformButton } from "@/components/form/TypeformButton";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
          Agora que você entendeu como funciona...{" "}
          <span className="text-gold">que tal experimentar no seu negócio?</span>
        </h2>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed max-w-3xl mx-auto">
          Clique no botão abaixo e veja na prática como funciona nossa Inteligência Artificial.
        </p>
        
        <p className="text-base md:text-lg text-foreground/70 mb-12 leading-relaxed max-w-3xl mx-auto">
          Você vai testar a IA diretamente no seu WhatsApp, e em seguida, um dos nossos consultores vai conversar com você para entender seu cenário e te mostrar, em uma call rápida, como isso pode ser aplicado no seu atendimento, com a sua linguagem, com os seus leads.
        </p>

        {/* Benefits list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          {[
            "Teste a IA no seu WhatsApp",
            "Call de consultoria gratuita",
            "Análise personalizada do seu negócio"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-foreground/80">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="space-y-6">
          <TypeformButton
            className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-background font-bold px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-xl shadow-2xl hover:shadow-gold/30 transform hover:scale-105 transition-all duration-300 border-2 border-gold/20"
            trackingId="final_cta_main"
            trackingSection="final_cta"
          >
            <Calendar className="mr-3 h-5 w-5" />
            Quero testar a IA e ver como ela se aplicaria no meu negócio
            <ArrowRight className="ml-3 h-5 w-5" />
          </TypeformButton>
          
          <p className="text-sm md:text-base text-foreground/60">
            ⚡ Análise gratuita • Implementação guiada • Sem compromisso
          </p>
        </div>

        {/* Final value proposition */}
        <div className="mt-12 p-6 bg-background/40 backdrop-blur-sm border border-gold/20 rounded-xl">
          <p className="text-lg md:text-xl font-semibold text-gold mb-2">
            Vamos te mostrar o poder da IA comercial
          </p>
          <p className="text-base md:text-lg text-foreground/80">
            — funcionando com a realidade do seu negócio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
