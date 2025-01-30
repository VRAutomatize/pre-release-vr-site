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

  const getIncludedFeatures = (planName: string) => {
    return features.filter(feature => {
      const value = feature[planName.toLowerCase() as keyof Omit<PricingFeature, 'name'>];
      return value === true || typeof value === 'string';
    });
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

        {/* Cards View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative mb-32">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                floating-card rounded-2xl overflow-hidden transition-all duration-300
                ${plan.highlighted 
                  ? 'md:-mt-8 md:mb-8 bg-gold/5 md:scale-110 z-10' 
                  : 'bg-secondary/5'
                }
              `}
            >
              <div className={`p-8 ${plan.highlighted ? 'bg-gold/10' : 'bg-secondary/20'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-gold' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-6">{plan.description}</p>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gold">
                    R$ {calculatePrice(plan.monthlyPrice)}
                    <span className="text-sm font-normal text-foreground/60">/mês</span>
                  </p>
                  {isAnnual && (
                    <p className="text-sm text-foreground/60">
                      12x de R$ {calculatePrice(plan.monthlyPrice)}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-sm font-medium text-foreground/80">O que está incluído:</p>
                <ul className="space-y-4">
                  {getIncludedFeatures(plan.name).map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">
                        {feature.name}
                        {typeof feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>] === 'string' && (
                          <span className="ml-1 text-gold">
                            ({feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>]})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
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
            </div>
          ))}
        </div>

        {/* Table View */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Compare:</h2>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Recursos</TableHead>
                  {plans.map((plan) => (
                    <TableHead 
                      key={plan.name}
                      className={`text-center ${plan.highlighted ? 'bg-gold/10' : ''}`}
                    >
                      <div className="space-y-2">
                        <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-gold' : ''}`}>
                          {plan.name}
                        </h3>
                        <p className="text-2xl font-bold text-gold">
                          R$ {calculatePrice(plan.monthlyPrice)}
                          <span className="text-sm font-normal text-foreground/60">/mês</span>
                        </p>
                        {isAnnual && (
                          <p className="text-sm text-foreground/60">
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
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    {plans.map((plan) => {
                      const included = feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>];
                      return (
                        <TableCell 
                          key={plan.name} 
                          className={`text-center ${plan.highlighted ? 'bg-gold/5' : ''}`}
                        >
                          {typeof included === 'boolean' ? (
                            included ? (
                              <Check className="h-5 w-5 text-gold mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="text-gold font-medium">{included}</span>
                          )}
                        </TableCell>
                      );
                    })}
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
