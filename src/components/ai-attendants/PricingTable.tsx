import { useState } from "react";
import { Plan, PricingFeature } from "@/types/pricing-types";
import PricingHeader from "./pricing/PricingHeader";
import PricingCards from "./pricing/PricingCards";
import PricingTableView from "./pricing/PricingTable";

const features: PricingFeature[] = [
  { name: "Integração com CRM", basic: true, pro: true, premium: true },
  { name: "Atendimento por Texto", basic: true, pro: true, premium: true },
  { name: "Atendimento por Áudio/Imagem", basic: false, pro: true, premium: true },
  { name: "Atendimento Multilíngue (PT, EN, ES)", basic: false, pro: true, premium: true },
  { name: "Coleta de Dados", basic: "Simples", pro: "Completa", premium: "Avançada" },
  { name: "Agendamentos (Google Agenda)", basic: false, pro: true, premium: true },
  { name: "Follow-up Automático", basic: false, pro: true, premium: true },
  { name: "Sistema NPS (Avaliação Google)", basic: false, pro: true, premium: true },
  { name: "Recuperação de Vendas Automática", basic: false, pro: true, premium: true },
  { name: "RAG Inteligente", basic: false, pro: true, premium: true },
  { name: "Suporte Prioritário", basic: false, pro: true, premium: true },
  { name: "IA Treinada (medicina, psicologia, cálculo, programação...)", basic: false, pro: false, premium: true },
];

const plans: Plan[] = [
  {
    name: "Básico",
    monthlyPrice: 690,
    description: "Ideal para pequenas empresas iniciando com IA"
  },
  {
    name: "Pro",
    monthlyPrice: 1270,
    description: "Para empresas que precisam de recursos avançados",
    highlighted: true
  },
  {
    name: "Premium",
    monthlyPrice: 1970,
    description: "Solução completa com IA especializada"
  }
];

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12;
      const discount = annualPrice * 0.25; // 25% discount
      return ((annualPrice - discount) / 12).toFixed(2);
    }
    return monthlyPrice.toFixed(2);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <PricingHeader isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        <PricingCards 
          plans={plans} 
          features={features} 
          calculatePrice={calculatePrice}
          isAnnual={isAnnual}
        />
        <PricingTableView 
          plans={plans} 
          features={features} 
          calculatePrice={calculatePrice}
          isAnnual={isAnnual}
        />
      </div>
    </section>
  );
};

export default PricingTable;