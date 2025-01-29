import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Plano CRM",
    features: [
      { name: "Números de WhatsApp", included: true, value: "Ilimitado" },
      { name: "Número de Acessos", included: true, value: "Ilimitado" },
      { name: "Funil de Vendas Personalizado", included: true, value: "Sim" },
      { name: "Sala de Espera", included: true, value: "Simples" },
      { name: "Divisão Automática de Clientes", included: true, value: "Sim" },
      { name: "Recuperação Ativa dos 'Sem Resposta'", included: false },
      { name: "Remarketing Ativo", included: false },
      { name: "Follow Up Automático", included: false },
      { name: "Sistema de Disparos em Massa", included: false },
      { name: "Automações e Conexão com Outros Sistemas", included: false },
      { name: "Conteúdo Complementar", included: true, value: "Sim" },
      { name: "Treinamento", included: true, value: "Sim" },
    ],
    implementation: 1270,
    monthly: 279,
    installments: 147.90
  },
  {
    name: "Plano CRM + Automações",
    features: [
      { name: "Números de WhatsApp", included: true, value: "Ilimitado" },
      { name: "Número de Acessos", included: true, value: "Ilimitado" },
      { name: "Funil de Vendas Personalizado", included: true, value: "Sim" },
      { name: "Sala de Espera", included: true, value: "Simples" },
      { name: "Divisão Automática de Clientes", included: true, value: "Sim" },
      { name: "Recuperação Ativa dos 'Sem Resposta'", included: true, value: "Sim" },
      { name: "Remarketing Ativo", included: true, value: "Sim" },
      { name: "Follow Up Automático", included: true, value: "Sim" },
      { name: "Sistema de Disparos em Massa", included: true, value: "Sim" },
      { name: "Automações e Conexão com Outros Sistemas", included: true, value: "Sim" },
      { name: "Conteúdo Complementar", included: true, value: "Sim" },
      { name: "Treinamento", included: true, value: "Sim" },
    ],
    implementation: 1970,
    monthly: 279,
    installments: 147.90
  }
];

const PricingPlans = () => {
  return (
    <section id="plans" className="relative z-10 py-20">
      <div className="text-center mb-16 animate-fade-up">
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
          Nossos Planos
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Escolha o Plano Ideal para Seu Negócio
        </h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Soluções flexíveis que crescem junto com sua empresa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
        {plans.map((plan, planIndex) => (
          <div 
            key={plan.name} 
            className={`floating-card rounded-2xl overflow-hidden animate-fade-up ${planIndex === 1 ? 'md:border-gold/50' : ''}`}
            style={{ animationDelay: `${planIndex * 0.2}s` }}
          >
            {/* Header */}
            <div className={`p-6 text-center border-b border-border ${planIndex === 1 ? 'bg-gold/5' : ''}`}>
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="space-y-1">
                <p className="text-sm text-foreground/60">A partir de</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-gold">R$ {plan.monthly}</span>
                  <span className="text-foreground/60">/mês</span>
                </div>
                <p className="text-sm text-foreground/60">
                  ou 12x de R$ {plan.installments.toFixed(2)}
                </p>
              </div>
              <Button 
                className="w-full mt-4 bg-gold hover:bg-gold-light text-background"
              >
                Agendar Demonstração
              </Button>
            </div>

            {/* Features */}
            <div className="p-6 space-y-4">
              <p className="text-sm font-medium text-foreground/80 mb-4">O que está incluído:</p>
              {plan.features.map((feature, index) => (
                <div 
                  key={feature.name} 
                  className="flex items-start gap-3 animate-fade-up"
                  style={{ animationDelay: `${(index * 0.1) + (planIndex * 0.2)}s` }}
                >
                  {feature.included ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm text-foreground/80">
                    {feature.name}
                    {feature.value && `: ${feature.value}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Implementation Cost */}
            <div className="p-6 bg-secondary/50 border-t border-border">
              <p className="text-sm text-center text-foreground/80">
                Implementação: <span className="font-semibold text-gold">R$ {plan.implementation.toLocaleString('pt-BR')}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4 text-sm text-foreground/80 max-w-3xl mx-auto px-4">
        <p className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <span className="text-gold">📌</span>
          O valor de implementação pode ser parcelado em até 3x sem juros no boleto.
        </p>
        <p className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <span className="text-gold">📌</span>
          O valor de implementação cobre toda a configuração e personalização do sistema, incluindo funis, automações e integração com sistemas complementares.
        </p>
        <p className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <span className="text-gold">📌</span>
          A mensalidade refere-se ao plano de assinatura do sistema de CRM (Kommo CRM), necessário para permanecer online. Também inclui suporte técnico via VR Automatize e reuniões de acompanhamento.
        </p>
      </div>
    </section>
  );
};

export default PricingPlans;