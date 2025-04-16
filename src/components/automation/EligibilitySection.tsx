
import React from "react";
import { Check } from "lucide-react";

const eligibilityItems = [
  "Tem um e-commerce e quer reduzir custos operacionais e melhorar atendimento.",
  "É infoprodutor(a) e precisa de uma máquina rodando vendas, follow-ups e onboarding.",
  "Presta serviços 1x1 e quer automatizar propostas, agendamentos e captação de leads.",
  "Trabalha com financiamento ou leads qualificados e quer validar perfis de compradores automaticamente antes de entrar em contato."
];

const EligibilitySection = () => {
  return (
    <section className="py-20 relative z-10" id="eligibility">
      <div className="container mx-auto px-4">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Se você se encaixa em um desses perfis, essa solução é pra você:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {eligibilityItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 glass rounded-xl animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="bg-gold/20 p-2 rounded-full flex-shrink-0">
                  <Check className="h-6 w-6 text-gold" />
                </div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
