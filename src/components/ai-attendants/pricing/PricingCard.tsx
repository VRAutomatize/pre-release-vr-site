
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateInstallments } from "@/utils/pricing";
import { Badge } from "@/components/ui/badge";

interface FeatureWithIcon {
  name: string;
  icon: React.ComponentType;
}

interface PricingCardProps {
  plan: {
    name: string;
    monthlyPrice: number;
    annualTotal: number;
    description: string;
    implementation: number;
    buttonText: string;
    highlighted?: boolean;
  };
  features: FeatureWithIcon[];
  isAnnual: boolean;
  index: number;
  showBasicPrefix?: boolean;
  showProPrefix?: boolean;
  showAdvancedPrefix?: boolean;
}

export const PricingCard = ({ 
  plan, 
  features, 
  isAnnual, 
  index,
  showBasicPrefix,
  showProPrefix,
  showAdvancedPrefix
}: PricingCardProps) => {
  const monthlyTotal = plan.monthlyPrice * 12;
  const savedAmount = monthlyTotal - plan.annualTotal;
  const installmentAmount = calculateInstallments(plan.annualTotal);
  const hasImplementation = plan.implementation > 0;

  return (
    <div
      className={`rounded-2xl overflow-hidden animate-fade-up transform transition-all duration-300 hover:shadow-lg ${
        plan.highlighted
          ? 'bg-gold/[0.03] border border-gold/20 relative'
          : 'bg-secondary/5 border border-border'
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        marginTop: plan.highlighted ? '-1rem' : '0',
        marginBottom: plan.highlighted ? '1rem' : '0',
        height: 'fit-content',
        zIndex: plan.highlighted ? 10 : 1
      }}
    >
      {plan.highlighted && (
        <div className="absolute -inset-12 bg-gold/5 blur-[60px] -z-10" />
      )}
      
      {plan.highlighted && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-background">
          Mais Popular
        </Badge>
      )}
      
      <div className={`p-6 md:p-8 text-center ${plan.highlighted ? 'bg-gold/[0.03]' : ''}`}>
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gold">{plan.name}</h3>
        <p className="text-sm text-foreground/60 mb-6 h-12">{plan.description}</p>
        
        {isAnnual ? (
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-gold mb-2">
              {plan.annualTotal >= 10000 
                ? `R$ ${plan.annualTotal/1000}k/ano`
                : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
            </div>
            <p className="text-sm text-foreground/60">
              12x de R$ {formatCurrency(installmentAmount)}
            </p>
            <p className="text-sm text-gold">
              Economia de R$ {formatCurrency(savedAmount)}
            </p>
          </div>
        ) : (
          <div className="text-2xl md:text-3xl font-bold text-gold mb-2">
            R$ {formatCurrency(plan.monthlyPrice)}/mês
          </div>
        )}

        {hasImplementation && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
            <p className="text-sm font-medium">Implementação</p>
            <p className="text-lg font-semibold text-gold">
              A partir de R$ {formatCurrency(plan.implementation)}
            </p>
            <p className="text-xs text-foreground/60">Parcelável</p>
          </div>
        )}
        
        <Button
          className={`w-full mt-6 ${
            plan.highlighted 
              ? 'bg-gold hover:bg-gold/80 text-background transition-colors duration-300' 
              : plan.name === "Premium" 
                ? 'bg-secondary/80 hover:bg-secondary/60'
                : 'bg-secondary/60 hover:bg-secondary/40'
          }`}
        >
          {plan.buttonText}
        </Button>
      </div>
      
      <div className={`p-6 md:p-8 ${plan.highlighted ? 'bg-gold/[0.02]' : ''}`}>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground/80 mb-1">Sem limite de mensagens</p>
          <p className="text-sm font-medium text-foreground/80 mb-1">Acesso ao dashboard completo</p>
          {plan.name !== "Premium" && <p className="text-sm font-medium text-foreground/80 mb-1">7 dias grátis</p>}
          <p className="text-sm font-medium text-foreground/80 mb-4">Sem fidelidade</p>
        </div>
        
        <div className="h-px w-full bg-border my-4"></div>
        
        <p className="text-sm font-medium text-foreground/80 mb-4">Recursos incluídos:</p>
        <ul className="space-y-3">
          {/* Add basic plan features for all plans */}
          {plan.name === "Básico" && (
            <>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Atendimento via texto</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Agendamentos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Suporte a múltiplos idiomas (PT, EN, ES)</span>
              </li>
            </>
          )}
          
          {/* Pro plan specific features */}
          {plan.name === "Pro" && (
            <>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Todos os recursos do Básico</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Atendimento via áudio</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Agendamentos para equipes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Follow-up automático</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Sistema de NPS</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">RAG inteligente</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">Suporte prioritário</span>
              </li>
            </>
          )}
          
          {showBasicPrefix && plan.name !== "Básico" && plan.name !== "Pro" && (
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium">Todos os recursos do Básico</span>
            </li>
          )}
          {showProPrefix && plan.name !== "Pro" && plan.name !== "Básico" && (
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium">Todos os recursos do Pro</span>
            </li>
          )}
          {showAdvancedPrefix && plan.name !== "Pro" && plan.name !== "Básico" && plan.name !== "Avançado" && (
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium">Todos os recursos do Avançado</span>
            </li>
          )}
          
          {/* Only show features for plans other than Basic and Pro */}
          {plan.name !== "Básico" && plan.name !== "Pro" && features.map((feature, index) => (
            <li key={feature.name} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
