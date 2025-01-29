import { Button } from "@/components/ui/button";

interface PlanCostsProps {
  implementation: number;
  monthly: number;
  installments: number;
  canInstallImplementation: boolean;
  planIndex: number;
}

const PlanCosts = ({ 
  implementation, 
  monthly, 
  installments, 
  canInstallImplementation,
  planIndex 
}: PlanCostsProps) => {
  return (
    <>
      <div className={`p-6 text-center ${planIndex === 1 ? 'bg-gold/5' : 'bg-secondary/50'}`}>
        <div className="space-y-2">
          <p className="text-sm text-foreground/60">Implementação</p>
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-gold">
              R$ {implementation.toLocaleString('pt-BR')}
            </span>
          </div>
          {canInstallImplementation && (
            <p className="text-sm text-foreground/60">
              ou 3x de R$ {(implementation / 3).toFixed(2)}
            </p>
          )}
        </div>
        <Button 
          className="w-full mt-6 bg-gold hover:bg-gold-light text-background"
        >
          Agendar Demonstração
        </Button>
      </div>

      <div className="p-4 border-b border-border bg-secondary/20">
        <div className="text-center">
          <p className="text-sm text-foreground/60">Mensalidade</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-semibold">R$ {monthly}</span>
            <span className="text-sm text-foreground/60">/mês</span>
          </div>
          <p className="text-xs text-foreground/60">
            ou 12x de R$ {installments.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlanCosts;