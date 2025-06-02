
import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, Clock, Target, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ObjectionEliminationSection = () => {
  const isMobile = useIsMobile();

  const objections = [
    {
      icon: AlertTriangle,
      objection: "E se não funcionar na minha empresa?",
      answer: "Garantia de resultado ou dinheiro de volta",
      details: "Analisamos seu negócio gratuitamente antes de propor qualquer solução. Se não atingirmos as metas acordadas em 90 dias, devolvemos 100% do investimento.",
      proof: "200+ empresas já implementaram com sucesso",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/30"
    },
    {
      icon: Clock,
      objection: "Quanto tempo leva para ver resultados?",
      answer: "Primeiros resultados em 15-30 dias",
      details: "Implementação em fases: automatizações simples primeiro (15 dias), depois sistemas complexos (30-60 dias). Você vê economia desde a primeira semana.",
      proof: "ROI positivo já no primeiro mês",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30"
    },
    {
      icon: Target,
      objection: "É muito caro para minha empresa?",
      answer: "Investimento se paga em 3-4 meses",
      details: "Sistema custa menos que 1 funcionário, mas substitui 3-8 pessoas. A economia mensal supera o investimento inicial rapidamente.",
      proof: "ROI médio de 380% no primeiro ano",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30"
    },
    {
      icon: Shield,
      objection: "E se eu perder o controle dos processos?",
      answer: "Você ganha mais controle e transparência",
      details: "Dashboards em tempo real, relatórios automáticos e alertas inteligentes. Vê tudo que acontece, quando acontece, com muito mais precisão que antes.",
      proof: "99.9% de uptime e controle total",
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30"
    }
  ];

  const urgencyFactors = [
    {
      icon: TrendingUp,
      title: "Seus concorrentes já estão automatizando",
      description: "Empresas que não automatizam perdem competitividade e ficam para trás no mercado"
    },
    {
      icon: Clock,
      title: "Cada mês de atraso = R$ 20k+ perdidos",
      description: "Enquanto você pensa, continua pagando custos operacionais desnecessários"
    },
    {
      icon: Target,
      title: "Vagas limitadas para atendimento personalizado",
      description: "Só conseguimos atender 5 empresas por mês com acompanhamento dedicado"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm bg-gold/15 text-gold mb-6 font-semibold">
            Eliminação de Dúvidas
          </span>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}>
            <span className="text-white block mb-2">Suas Principais</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-green-400">
              Preocupações Respondidas
            </span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80 max-w-3xl mx-auto`}>
            Entendemos suas dúvidas. Veja como garantimos sua tranquilidade e resultados
          </p>
        </div>

        {/* Objections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {objections.map((item, index) => (
            <Card 
              key={index}
              className={`p-8 ${item.bgColor} ${item.borderColor} border-2 rounded-2xl hover:border-opacity-60 transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`${item.bgColor} ${item.borderColor} border rounded-lg p-3`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.objection}
                  </h3>
                  <p className={`font-bold ${item.color} text-xl mb-3`}>
                    {item.answer}
                  </p>
                </div>
              </div>
              
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {item.details}
              </p>
              
              <div className={`${item.bgColor} border ${item.borderColor} rounded-lg p-4 flex items-center gap-3`}>
                <CheckCircle className={`h-5 w-5 ${item.color}`} />
                <span className={`${item.color} font-semibold`}>
                  {item.proof}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Why Now Section */}
        <Card className="p-8 md:p-12 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-400/30 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4`}>
              <span className="text-white">Por que</span>{" "}
              <span className="text-red-400">Agir Agora?</span>
            </h3>
            <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80`}>
              O custo de não automatizar está ficando maior a cada dia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {urgencyFactors.map((factor, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-400/15 border border-red-400/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <factor.icon className="h-8 w-8 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {factor.title}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="bg-green-400/15 border border-green-400/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 text-center">
              Nossas Garantias para Sua Tranquilidade:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-foreground/90">Análise gratuita sem compromisso</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-foreground/90">Acompanhamento dedicado 90 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-foreground/90">Garantia de resultado ou dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-foreground/90">Suporte técnico 24/7 incluso</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ObjectionEliminationSection;
