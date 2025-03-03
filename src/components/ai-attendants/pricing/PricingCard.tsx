import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateInstallments } from "@/utils/pricing";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Map of feature descriptions explaining benefits
const featureBenefits: Record<string, string> = {
  // Basic features
  "Atendimento via texto": "Permite conversas por texto 24/7, respondendo dúvidas dos clientes mesmo fora do horário comercial.",
  "Agendamentos": "Facilita o agendamento de consultas e compromissos, reduzindo trabalho manual e erros.",
  "Suporte a múltiplos idiomas (PT, EN, ES)": "Expanda seu atendimento para clientes internacionais com comunicação em diferentes idiomas.",
  "Sem limite de mensagens": "Utilize o sistema à vontade, sem se preocupar com cobranças extras por volume.",
  "Acesso ao dashboard completo": "Visualize métricas e resultados detalhados para otimizar sua estratégia.",
  "7 dias grátis": "Teste todas as funcionalidades sem compromisso antes de decidir.",
  "Sem fidelidade": "Cancele quando quiser, sem multas ou taxas adicionais.",
  
  // Pro features
  "Atendimento via áudio": "Oferece uma experiência mais humana e acessível através de mensagens de áudio.",
  "Agendamentos para equipes": "Gerencia agendas de várias pessoas simultaneamente, otimizando recursos da empresa.",
  "Follow-up automático": "Mantém o contato com leads sem esforço manual, aumentando taxas de conversão.",
  "Sistema de NPS": "Mede satisfação do cliente com precisão, identificando áreas de melhoria.",
  "RAG inteligente": "Fornece respostas baseadas em seus documentos, garantindo informações precisas.",
  "Suporte prioritário": "Acesso a uma equipe dedicada para resolver problemas rapidamente.",
  
  // Advanced features
  "Atendimento via imagem": "Permite análise de imagens, ideal para diagnósticos visuais e atendimentos técnicos.",
  "Processamento de arquivos": "Analisa documentos e extrai informações relevantes automaticamente.",
  "Funcionalidades de SDR": "Qualifica leads e agenda reuniões automaticamente, otimizando seu funil de vendas.",
  "Integração com loja virtual": "Conecta-se diretamente com e-commerces para gerenciar pedidos e dúvidas.",
  "Recuperação de vendas": "Reduz abandono de carrinho e recupera clientes inativos automaticamente.",
  "Pesquisa e aprendizado automático": "Melhora continuamente com base nas interações, tornando-se mais preciso.",
  
  // Premium features
  "Desenvolvimento sob medida": "Soluções personalizadas para desafios específicos do seu negócio.",
  "Integrações personalizadas": "Conecta com qualquer sistema ou software que sua empresa já utiliza.",
  "Treinamento especializado (medicina, etc.)": "IA treinada especificamente para seu setor, com conhecimento técnico relevante.",
  "Suporte a 26 idiomas": "Alcance global com suporte a praticamente qualquer mercado internacional.",
  "Interação assíncrona": "Mantém o contexto entre conversas, mesmo com grandes intervalos de tempo.",
  "Memória e contexto avançados": "Lembra-se de interações anteriores para conversas mais naturais e personalizadas.",
  "RAG avançado": "Respostas ultra-precisas baseadas em seus dados e documentos proprietários.",
  "Análises de dados personalizadas": "Insights estratégicos específicos para seu negócio e setor.",
  "Gerenciamento completo": "Administra contatos, e-mails, estoque e outras informações críticas do negócio."
};

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

// Feature item component with tooltip
const FeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-start gap-3">
    <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
    <span className="text-sm">{feature}</span>
    {featureBenefits[feature] && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help mt-0.5">
            <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="right"
          className="max-w-[250px] bg-black/90 border-gold/20 text-white"
        >
          <p>{featureBenefits[feature]}</p>
        </TooltipContent>
      </Tooltip>
    )}
  </li>
);

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
    <TooltipProvider delayDuration={300}>
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
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground/80 mb-1">Sem limite de mensagens</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                >
                  <p>{featureBenefits["Sem limite de mensagens"]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground/80 mb-1">Acesso ao dashboard completo</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                >
                  <p>{featureBenefits["Acesso ao dashboard completo"]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {plan.name !== "Premium" && (
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground/80 mb-1">7 dias grátis</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right"
                    className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                  >
                    <p>{featureBenefits["7 dias grátis"]}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground/80 mb-4">Sem fidelidade</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                >
                  <p>{featureBenefits["Sem fidelidade"]}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="h-px w-full bg-border my-4"></div>
          
          <p className="text-sm font-medium text-foreground/80 mb-4">Recursos incluídos:</p>
          <ul className="space-y-3">
            {/* Basic plan features */}
            {plan.name === "Básico" && (
              <>
                <FeatureItem feature="Atendimento via texto" />
                <FeatureItem feature="Agendamentos" />
                <FeatureItem feature="Suporte a múltiplos idiomas (PT, EN, ES)" />
              </>
            )}
            
            {/* Pro plan specific features */}
            {plan.name === "Pro" && (
              <>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Todos os recursos do Básico</span>
                </li>
                <FeatureItem feature="Atendimento via áudio" />
                <FeatureItem feature="Agendamentos para equipes" />
                <FeatureItem feature="Follow-up automático" />
                <FeatureItem feature="Sistema de NPS" />
                <FeatureItem feature="RAG inteligente" />
                <FeatureItem feature="Suporte prioritário" />
              </>
            )}
            
            {/* Advanced plan specific features */}
            {plan.name === "Avançado" && (
              <>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Todos os recursos dos Planos Básico e Pro</span>
                </li>
                <FeatureItem feature="Atendimento via imagem" />
                <FeatureItem feature="Processamento de arquivos" />
                <FeatureItem feature="Funcionalidades de SDR" />
                <FeatureItem feature="Integração com loja virtual" />
                <FeatureItem feature="Recuperação de vendas" />
                <FeatureItem feature="Pesquisa e aprendizado automático" />
              </>
            )}
            
            {/* Premium plan specific features */}
            {plan.name === "Premium" && (
              <>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">Todos os recursos dos outros planos</span>
                </li>
                <FeatureItem feature="Desenvolvimento sob medida" />
                <FeatureItem feature="Integrações personalizadas" />
                <FeatureItem feature="Treinamento especializado (medicina, etc.)" />
                <FeatureItem feature="Suporte a 26 idiomas" />
                <FeatureItem feature="Interação assíncrona" />
                <FeatureItem feature="Memória e contexto avançados" />
                <FeatureItem feature="RAG avançado" />
                <FeatureItem feature="Análises de dados personalizadas" />
                <FeatureItem feature="Gerenciamento completo" />
              </>
            )}
            
            {showBasicPrefix && plan.name !== "Básico" && plan.name !== "Pro" && plan.name !== "Avançado" && plan.name !== "Premium" && (
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Todos os recursos do Básico</span>
              </li>
            )}
            {showProPrefix && plan.name !== "Pro" && plan.name !== "Básico" && plan.name !== "Avançado" && plan.name !== "Premium" && (
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Todos os recursos do Pro</span>
              </li>
            )}
            {showAdvancedPrefix && plan.name !== "Pro" && plan.name !== "Básico" && plan.name !== "Avançado" && plan.name !== "Premium" && (
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Todos os recursos do Avançado</span>
              </li>
            )}
            
            {/* Only show features for plans other than Basic, Pro, Advanced and Premium */}
            {plan.name !== "Básico" && plan.name !== "Pro" && plan.name !== "Avançado" && plan.name !== "Premium" && features.map((feature, index) => (
              <li key={feature.name} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature.name}</span>
                {featureBenefits[feature.name] && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right"
                      className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                    >
                      <p>{featureBenefits[feature.name]}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
};
