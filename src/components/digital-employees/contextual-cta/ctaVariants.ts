
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  AlertTriangle,
  Target
} from "lucide-react";
import { CTAVariant } from "./types";

export const ctaVariants: Record<string, CTAVariant[]> = {
  high_intent: [
    {
      id: "urgent_implementation",
      title: "🔥 Vagas Limitadas para Dezembro",
      description: "Apenas 3 vagas restantes para implementação em dezembro. Garante já!",
      buttonText: "Quero Garantir Minha Vaga",
      icon: AlertTriangle,
      urgency: "high",
      color: "text-red-400",
      bgColor: "bg-red-500/10 border-red-500/30"
    }
  ],
  executive: [
    {
      id: "executive_consultation",
      title: "Consultoria Executiva Personalizada",
      description: "Análise estratégica com nossos especialistas para sua empresa",
      buttonText: "Agendar Consultoria VIP",
      icon: Target,
      urgency: "medium",
      color: "text-gold",
      bgColor: "bg-gold/10 border-gold/30"
    }
  ],
  price_sensitive: [
    {
      id: "roi_calculator",
      title: "Calcule Sua Economia Exata",
      description: "Descubra quanto pode economizar por ano com automação",
      buttonText: "Calcular ROI Grátis",
      icon: Calculator,
      urgency: "medium",
      color: "text-green-400",
      bgColor: "bg-green-500/10 border-green-500/30"
    }
  ],
  feature_focused: [
    {
      id: "technical_demo",
      title: "Demo Técnica Personalizada",
      description: "Veja exatamente como funciona na prática",
      buttonText: "Ver Demo Ao Vivo",
      icon: Zap,
      urgency: "medium",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10 border-blue-500/30"
    }
  ],
  low_intent: [
    {
      id: "social_proof",
      title: "200+ Empresas Já Economizam Milhões",
      description: "Veja cases reais de transformação digital",
      buttonText: "Ver Cases de Sucesso",
      icon: Users,
      urgency: "low",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/30"
    }
  ],
  medium_intent: [
    {
      id: "consultation",
      title: "Consultoria Gratuita de 30 Minutos",
      description: "Análise personalizada do seu potencial de automação",
      buttonText: "Falar com Especialista",
      icon: Calculator,
      urgency: "medium",
      color: "text-gold",
      bgColor: "bg-gold/10 border-gold/30"
    }
  ]
};
