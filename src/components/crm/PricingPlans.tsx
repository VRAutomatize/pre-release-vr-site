import { useState } from "react";
import { Plan } from "@/types/pricing";
import PlanFeatureList from "./pricing/PlanFeatureList";
import PlanCosts from "./pricing/PlanCosts";
import InfoCards from "./pricing/InfoCards";
import { Switch } from "@/components/ui/switch";

const plans: Plan[] = [
  {
    name: "CRM",
    features: [
      { name: "Números de WhatsApp", included: true, value: "Ilimitado" },
      { name: "Número de Acessos", included: true, value: "Ilimitado" },
      { name: "Sala de Espera", included: true, value: "Simples" },
      { name: "Funil de Vendas Personalizado", included: true, value: "Sim" },
      { name: "Divisão Automática de Clientes", included: true, value: "Sim" },
      { name: "Conteúdo Complementar", included: true, value: "Sim" },
      { name: "Treinamento", included: true, value: "Sim" },
    ],
    costs: {
      implementation: 1270,
      monthly: 279,
      installments: 147.90,
      canInstallImplementation: true,
      maxInstallments: 2
    }
  },
  {
    name: "CRM + Automações",
    features: [
      { name: "Números de WhatsApp", included: true, value: "Ilimitado" },
      { name: "Número de Acessos", included: true, value: "Ilimitado" },
      { name: "Sala de Espera", included: true, value: "Completa" },
      { name: "Funil de Vendas Personalizado", included: true, value: "Sim" },
      { name: "Divisão Automática de Clientes", included: true, value: "Sim" },
      { name: "Recuperação Ativa dos 'Sem Resposta'", included: true, value: "Sim" },
      { name: "Remarketing Ativo", included: true, value: "Sim" },
      { name: "Follow Up Automático", included: true, value: "Sim" },
      { name: "Sistema de Disparos em Massa", included: true, value: "Sim" },
      { name: "Automações e Conexão com Outros Sistemas", included: true, value: "Sim" },
      { name: "Conteúdo Complementar", included: true, value: "Sim" },
      { name: "Treinamento", included: true, value: "Sim" },
    ],
    costs: {
      implementation: 1970,
      monthly: 279,
      installments: 147.90,
      canInstallImplementation: true,
      maxInstallments: 3
    },
    highlighted: true
  }
];

const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="plans" className="relative z-10 py-20">
      <div className="text-center mb-16 animate-fade-up">
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
          Nossos Planos
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Escolha o Plano Ideal para Seu Negócio
        </h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Soluções flexíveis que crescem junto com sua empresa
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm ${!isAnnual ? 'text-gold' : 'text-foreground/60'}`}>Mensal</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-gold"
          />
          <span className={`text-sm ${isAnnual ? 'text-gold' : 'text-foreground/60'}`}>Anual</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 items-start">
        {plans.map((plan, planIndex) => (
          <div 
            key={plan.name} 
            className={`floating-card rounded-2xl overflow-hidden animate-fade-up h-fit ${plan.highlighted ? 'bg-gold/5' : ''}`}
            style={{ animationDelay: `${planIndex * 0.2}s` }}
          >
            <div className={`p-6 text-center ${plan.highlighted ? 'bg-gold/5' : 'bg-secondary/50'}`}>
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            </div>
            
            <PlanCosts
              implementation={plan.costs.implementation}
              monthly={plan.costs.monthly}
              installments={isAnnual ? plan.costs.installments : plan.costs.monthly}
              canInstallImplementation={plan.costs.canInstallImplementation}
              maxInstallments={plan.costs.maxInstallments}
              isAnnual={isAnnual}
              highlighted={plan.highlighted}
            />
            
            <PlanFeatureList 
              features={plan.features} 
              highlighted={plan.highlighted}
            />
          </div>
        ))}
      </div>

      <InfoCards />
    </section>
  );
};

export default PricingPlans;
