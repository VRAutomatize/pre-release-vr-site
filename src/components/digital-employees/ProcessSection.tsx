
import React from "react";
import { CheckCircle, MessageCircle, Target, Rocket } from "lucide-react";

const ProcessSection = () => {
  const processSteps = [
    {
      icon: MessageCircle,
      title: "Inteligência Artificial customizada",
      subtitle: "com o DNA do seu negócio",
      description: "Conversas reais, com inteligência de verdade. Nada de respostas genéricas ou ChatBots engessados.",
      details: "Cada Agente IA é construído sob medida, com a linguagem, o tom e os critérios do seu processo de vendas."
    },
    {
      icon: Target,
      title: "Ela entende o seu cliente",
      subtitle: "fala e age como o seu melhor vendedor",
      description: "O resultado? Uma experiência de atendimento humana, coerente e realmente personalizada.",
      details: "Mas é muito mais eficiente, precisa e escalável."
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Linha decorativa */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        <div className="space-y-16 md:space-y-20">
          {processSteps.map((step, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-gold" />
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                <h4 className="text-xl md:text-2xl text-gold font-semibold mb-6">
                  {step.subtitle}
                </h4>
                
                <p className="text-lg md:text-xl text-foreground/80 mb-4 leading-relaxed">
                  {step.description}
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {step.details}
                </p>
              </div>

              {/* Visual placeholder */}
              <div className="flex-1 max-w-md lg:max-w-lg">
                <div className="bg-background/40 backdrop-blur-sm border border-gold/20 rounded-xl p-8 hover:border-gold/40 transition-all duration-300 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-gold/10 to-gold/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <step.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                      <p className="text-foreground/60">Demonstração Visual</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
