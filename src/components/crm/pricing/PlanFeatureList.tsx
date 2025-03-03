
import { PlanFeature } from "@/types/pricing";
import { Info } from "lucide-react";
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

interface PlanFeatureListProps {
  features: PlanFeature[];
  highlighted?: boolean;
}

const PlanFeatureList = ({ features, highlighted }: PlanFeatureListProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className={`p-6 ${highlighted ? 'bg-gold/5' : ''}`}>
        <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className={`animate-fade-up glass rounded-lg p-4 hover:bg-white/10 transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-gold' : 'bg-gray-500'}`} />
                  <span className="text-sm text-foreground/80">
                    {feature.name}
                  </span>
                  
                  {/* Tooltip showing feature benefit */}
                  {featureBenefits[feature.name] && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right"
                        className="max-w-[250px] bg-black/90 border-gold/20 text-white"
                      >
                        <p>{featureBenefits[feature.name]}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                {feature.value && (
                  <span className="text-sm font-medium text-gold">
                    {feature.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PlanFeatureList;
