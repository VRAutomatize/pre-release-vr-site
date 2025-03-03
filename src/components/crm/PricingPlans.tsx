
import { useState } from "react";
import { Plan } from "@/types/pricing";
import PricingHeader from "./pricing/PricingHeader";
import PlanCard from "./pricing/PlanCard";
import InfoCards from "./pricing/InfoCards";
import { Button } from "@/components/ui/button";
import { PricingFeatures } from "../ai-attendants/pricing/PricingFeatures";

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
      { name: "Automações e Integrações", included: true, value: "Sim" },
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
  const [isAnnual, setIsAnnual] = useState(true);
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="plans" className="relative z-10 py-20">
      <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      
      <div className="flex justify-center mb-10">
        <Button 
          variant="outline" 
          className="text-gold hover:text-gold/80 border-gold/20 hover:bg-gold/5 hover:border-gold/30 px-6"
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? "Planos" : "Compare"}
        </Button>
      </div>

      {!showTable ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 items-start">
          {plans.map((plan, planIndex) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isAnnual={isAnnual}
              index={planIndex}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4">
          <PricingFeatures isAnnual={isAnnual} />
        </div>
      )}

      <InfoCards />
    </section>
  );
};

export default PricingPlans;
