import { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PricingFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

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

const plans = [
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

const PricingCards = ({ isAnnual }: { isAnnual: boolean }) => {
  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12;
      const discount = annualPrice * 0.25;
      return ((annualPrice - discount) / 12).toFixed(2);
    }
    return monthlyPrice.toFixed(2);
  };

  const getIncludedFeatures = (planName: string) => {
    const planKey = planName.toLowerCase() as keyof Omit<PricingFeature, 'name'>;
    return features.map(feature => ({
      ...feature,
      included: feature[planKey]
    }));
  };

  // Reorder plans to ensure Pro is in the middle
  const orderedPlans = [
    plans[0], // Basic
    plans[1], // Pro
    plans[2], // Premium
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {orderedPlans.map((plan, index) => (
        <div
          key={plan.name}
          className={`floating-card rounded-2xl overflow-hidden animate-fade-up ${
            plan.highlighted
              ? 'bg-gold/10'
              : 'bg-secondary/20'
          }`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={`p-8 text-center ${plan.highlighted ? 'bg-gold/10' : ''}`}>
            <h3 className="text-2xl font-bold mb-2 text-gold">{plan.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
            <div className="text-3xl font-bold text-gold mb-2">
              R$ {calculatePrice(plan.monthlyPrice)}
              <span className="text-sm font-normal text-foreground/60">/mês</span>
            </div>
            {isAnnual && (
              <p className="text-sm text-foreground/60 mb-4">
                12x de R$ {calculatePrice(plan.monthlyPrice)}
              </p>
            )}
            <Button
              className={`w-full ${
                plan.highlighted
                  ? 'bg-gold hover:bg-gold/90 text-background'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              Contratar Agora
            </Button>
          </div>
          <div className="p-8">
            <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
            <ul className="space-y-4">
              {getIncludedFeatures(plan.name).map((feature) => {
                if (feature.included === false) return null;
                return (
                  <li key={feature.name} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-gold flex-shrink-0" />
                    <span className="text-sm">
                      {feature.name}
                      {typeof feature.included === 'string' && (
                        <span className="ml-1 text-gold">
                          ({feature.included})
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12;
      const discount = annualPrice * 0.25;
      return ((annualPrice - discount) / 12).toFixed(2);
    }
    return monthlyPrice.toFixed(2);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
            Nossos Planos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Plano Ideal para Seu Negócio
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-4">
            Soluções flexíveis que crescem junto com sua empresa
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-gold" />
            <p className="text-lg font-semibold text-gold">
              Mensagens ilimitadas. Não pague por conversa!
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-base font-medium ${!isAnnual ? "text-gold" : "text-foreground/60"}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gold data-[state=unchecked]:bg-input h-[24px] w-[44px]"
            />
            <span className={`text-base font-medium ${isAnnual ? "text-gold" : "text-foreground/60"}`}>
              Anual
              <span className="ml-2 text-sm text-gold">(-25%)</span>
            </span>
          </div>
        </div>

        <PricingCards isAnnual={isAnnual} />

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Compare:</h3>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px]">Recursos</TableHead>
                  {plans.map((plan) => (
                    <TableHead 
                      key={plan.name}
                      className={`text-center min-w-[200px] ${plan.highlighted ? "bg-gold/5" : ""}`}
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gold">{plan.name}</h3>
                        <p className="text-sm text-foreground/60">{plan.description}</p>
                        <div className="text-2xl font-bold">
                          R$ {calculatePrice(plan.monthlyPrice)}
                          <span className="text-sm font-normal text-foreground/60">/mês</span>
                        </div>
                        {isAnnual && (
                          <p className="text-sm text-foreground/60">
                            12x de R$ {calculatePrice(plan.monthlyPrice)}
                          </p>
                        )}
                        <Button 
                          className={`w-full ${
                            plan.highlighted 
                              ? "bg-gold hover:bg-gold/90 text-background" 
                              : "bg-secondary/80 hover:bg-secondary text-foreground hover:text-foreground/90"
                          }`}
                        >
                          Contratar Agora
                        </Button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.name} className="hover:bg-secondary/20">
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    {["basic", "pro", "premium"].map((plan) => (
                      <TableCell key={plan} className="text-center">
                        {typeof feature[plan as keyof Omit<PricingFeature, "name">] === "boolean" ? (
                          feature[plan as keyof Omit<PricingFeature, "name">] ? (
                            <Check className="h-5 w-5 text-gold mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-gold">
                            {feature[plan as keyof Omit<PricingFeature, "name">]}
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;