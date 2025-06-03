
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Users, Clock, Filter, Play } from "lucide-react";
import { useBehavioralSegmentation } from "@/hooks/useBehavioralSegmentation";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  revenue: string;
  savings: string;
  roi: string;
  timeframe: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  tags: string[];
  videoUrl?: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
}

const InteractiveCasesCarousel = () => {
  const { trackFeatureInteraction, currentSegment } = useBehavioralSegmentation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const cases: CaseStudy[] = [
    {
      id: "ecommerce-2m",
      company: "E-commerce Fashion",
      industry: "E-commerce",
      revenue: "R$ 2M/mês",
      savings: "R$ 450k/ano",
      roi: "380%",
      timeframe: "6 meses",
      quote: "Automatizamos 85% do atendimento. Reduzimos equipe de 15 para 4 pessoas.",
      author: "Marina Silva",
      role: "CEO & Fundadora",
      rating: 5,
      tags: ["atendimento", "ecommerce", "reducao-custos"],
      results: [
        { metric: "Atendimentos/dia", before: "150", after: "800", improvement: "+433%" },
        { metric: "Tempo resposta", before: "4h", after: "30s", improvement: "-87%" },
        { metric: "Satisfação", before: "78%", after: "94%", improvement: "+16%" }
      ]
    },
    {
      id: "industria-5m",
      company: "Indústria Alimentícia",
      industry: "Indústria",
      revenue: "R$ 5M/mês",
      savings: "R$ 680k/ano", 
      roi: "420%",
      timeframe: "8 meses",
      quote: "Sistema integrado com ERP eliminou 95% dos erros operacionais.",
      author: "Carlos Mendes",
      role: "Diretor de Operações",
      rating: 5,
      tags: ["industria", "erp", "automacao"],
      results: [
        { metric: "Erros operacionais", before: "12%", after: "0.6%", improvement: "-95%" },
        { metric: "Tempo processamento", before: "6h", after: "20min", improvement: "-83%" },
        { metric: "Produtividade", before: "100%", after: "340%", improvement: "+240%" }
      ]
    },
    {
      id: "marketplace-1m",
      company: "Marketplace B2B",
      industry: "Marketplace",
      revenue: "R$ 1.2M/mês",
      savings: "R$ 220k/ano",
      roi: "350%",
      timeframe: "4 meses",
      quote: "ROI de 350% em 4 meses. Melhor investimento tecnológico que fizemos.",
      author: "Ana Costa",
      role: "Sócia-fundadora",
      rating: 5,
      tags: ["marketplace", "b2b", "roi"],
      results: [
        { metric: "Leads qualificados", before: "50/mês", after: "280/mês", improvement: "+460%" },
        { metric: "Taxa conversão", before: "2.1%", after: "8.7%", improvement: "+314%" },
        { metric: "Ticket médio", before: "R$ 1.2k", after: "R$ 2.8k", improvement: "+133%" }
      ]
    },
    {
      id: "consultoria-900k",
      company: "Consultoria Premium",
      industry: "Consultoria",
      revenue: "R$ 900k/mês",
      savings: "R$ 180k/ano",
      roi: "290%",
      timeframe: "5 meses",
      quote: "Relatórios que levavam dias agora são gerados em minutos.",
      author: "Roberto Alves",
      role: "Sócio-fundador",
      rating: 5,
      tags: ["consultoria", "relatorios", "produtividade"],
      results: [
        { metric: "Tempo relatórios", before: "3 dias", after: "15min", improvement: "-99%" },
        { metric: "Margem lucro", before: "18%", after: "31%", improvement: "+72%" },
        { metric: "Clientes ativos", before: "45", after: "120", improvement: "+167%" }
      ]
    }
  ];

  const filters = [
    { id: "all", label: "Todos os Cases", count: cases.length },
    { id: "ecommerce", label: "E-commerce", count: cases.filter(c => c.industry === "E-commerce").length },
    { id: "industria", label: "Indústria", count: cases.filter(c => c.industry === "Indústria").length },
    { id: "marketplace", label: "Marketplace", count: cases.filter(c => c.industry === "Marketplace").length },
    { id: "consultoria", label: "Consultoria", count: cases.filter(c => c.industry === "Consultoria").length }
  ];

  const filteredCases = activeFilter === "all" 
    ? cases 
    : cases.filter(c => c.industry.toLowerCase().includes(activeFilter) || c.tags.includes(activeFilter));

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    trackFeatureInteraction(`case_filter_${filterId}`);
  };

  const handleCaseView = (caseId: string) => {
    setSelectedCase(selectedCase === caseId ? null : caseId);
    trackFeatureInteraction(`case_detail_${caseId}`);
  };

  return (
    <section className="section-premium">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Cases de Sucesso Comprovados
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Resultados reais de empresas que transformaram suas operações
          </p>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(filter.id)}
                className={`${
                  activeFilter === filter.id 
                    ? "bg-gold text-background" 
                    : "border-gold/30 text-gold hover:bg-gold/10"
                }`}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredCases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="premium-glass border-gold/20 hover:border-gold/40 transition-all h-full">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gold">{caseStudy.company}</h3>
                        <p className="text-sm text-foreground/70">{caseStudy.industry} • {caseStudy.revenue}</p>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        ROI {caseStudy.roi}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(caseStudy.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground/90 italic mb-4">
                      "{caseStudy.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-sm text-foreground/70 mb-4">
                      <p className="font-medium">{caseStudy.author}</p>
                      <p>{caseStudy.role}</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <TrendingUp className="h-4 w-4 text-green-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-400">{caseStudy.savings}</p>
                        <p className="text-xs text-foreground/60">Economia/ano</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-blue-400">{caseStudy.roi}</p>
                        <p className="text-xs text-foreground/60">ROI</p>
                      </div>
                      <div className="text-center">
                        <Clock className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-purple-400">{caseStudy.timeframe}</p>
                        <p className="text-xs text-foreground/60">Implementação</p>
                      </div>
                    </div>

                    {/* Expandable Results */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCaseView(caseStudy.id)}
                      className="w-full border-gold/30 text-gold hover:bg-gold/10"
                    >
                      {selectedCase === caseStudy.id ? "Ocultar" : "Ver"} Resultados Detalhados
                    </Button>

                    <AnimatePresence>
                      {selectedCase === caseStudy.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3"
                        >
                          {caseStudy.results.map((result, idx) => (
                            <div key={idx} className="bg-black/20 rounded-lg p-3">
                              <p className="font-medium text-gold text-sm">{result.metric}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-red-400">Antes: {result.before}</span>
                                <span className="text-green-400">Depois: {result.after}</span>
                              </div>
                              <p className="text-center font-bold text-green-400 text-lg">
                                {result.improvement}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCasesCarousel;
