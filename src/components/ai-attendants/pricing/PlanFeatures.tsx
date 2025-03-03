
import { Check } from "lucide-react";
import { FeatureItem } from "./FeatureItem";

interface PlanFeaturesProps {
  planName: string;
  features: { name: string; icon: React.ComponentType }[];
  showBasicPrefix?: boolean;
  showProPrefix?: boolean;
  showAdvancedPrefix?: boolean;
}

export const PlanFeatures = ({
  planName,
  features,
  showBasicPrefix,
  showProPrefix,
  showAdvancedPrefix
}: PlanFeaturesProps) => {
  return (
    <>
      {/* Basic plan features */}
      {planName === "Básico" && (
        <>
          <FeatureItem feature="Atendimento via texto" />
          <FeatureItem feature="Agendamentos" />
          <FeatureItem feature="Suporte a múltiplos idiomas (PT, EN, ES)" />
        </>
      )}
      
      {/* Pro plan specific features */}
      {planName === "Pro" && (
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
      {planName === "Avançado" && (
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
      {planName === "Premium" && (
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
      
      {showBasicPrefix && planName !== "Básico" && planName !== "Pro" && planName !== "Avançado" && planName !== "Premium" && (
        <li className="flex items-start gap-3">
          <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium">Todos os recursos do Básico</span>
        </li>
      )}
      {showProPrefix && planName !== "Pro" && planName !== "Básico" && planName !== "Avançado" && planName !== "Premium" && (
        <li className="flex items-start gap-3">
          <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium">Todos os recursos do Pro</span>
        </li>
      )}
      {showAdvancedPrefix && planName !== "Pro" && planName !== "Básico" && planName !== "Avançado" && planName !== "Premium" && (
        <li className="flex items-start gap-3">
          <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium">Todos os recursos do Avançado</span>
        </li>
      )}
      
      {/* Only show features for plans other than Basic, Pro, Advanced and Premium */}
      {planName !== "Básico" && planName !== "Pro" && planName !== "Avançado" && planName !== "Premium" && features.map((feature) => (
        <FeatureItem key={feature.name} feature={feature.name} />
      ))}
    </>
  );
};
