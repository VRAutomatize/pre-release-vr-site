import { useState } from "react";
import { MessageSquare, Calendar, Globe, Headphones, Users, BarChart2, Zap, Shield, Image, FileText, BarChart, ShoppingCart, RefreshCw, Search, Code, Box, Languages, Clock, Brain, PieChart, Database, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/digital-employees/pricing/PricingCard";
import { PricingFeatures } from "@/components/digital-employees/pricing/PricingFeatures";
import { features, plans, pricingFaqs } from "@/components/digital-employees/pricing/pricingData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TooltipProvider } from "@/components/ui/tooltip";

const featureIcons: { [key: string]: React.ComponentType } = {
  "Atendimento via texto": MessageSquare,
  "Agendamentos": Calendar,
  "Suporte a múltiplos idiomas (PT, EN, ES)": Globe,
  "Atendimento via áudio": Headphones,
  "Agendamentos para equipes": Users,
  "Follow-up automático": BarChart2,
  "Sistema de NPS": BarChart2,
  "RAG inteligente": Zap,
  "Suporte prioritário": Shield,
  "Atendimento via imagem": Image,
  "Processamento de arquivos": FileText,
  "Funcionalidades de SDR": BarChart,
  "Integração com loja virtual": ShoppingCart,
  "Recuperação de vendas": RefreshCw,
  "Pesquisa e aprendizado automático": Search,
  "Desenvolvimento sob medida": Code,
  "Integrações personalizadas": Box,
  "Treinamento especializado (medicina, etc.)": Brain,
  "Suporte a 26 idiomas": Languages,
  "Interação assíncrona": Clock,
  "Memória e contexto avançados": Brain,
  "RAG avançado": Zap,
  "Análises de dados personalizadas": PieChart,
  "Gerenciamento completo": Database,
};

const PricingCards = ({ isAnnual }: { isAnnual: boolean }) => {
  const getFeaturesByPlan = (planName: string) => {
    const planKey = planName.toLowerCase();
    return features
      .filter(feature => feature[planKey as keyof typeof feature] === true)
      .map(feature => ({
        name: feature.name,
        icon: featureIcons[feature.name] || Check
      }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 mt-12">
      {plans.map((plan, index) => (
        <PricingCard
          key={plan.name}
          plan={plan}
          features={getFeaturesByPlan(plan.name)}
          isAnnual={isAnnual}
          index={index}
          showBasicPrefix={index > 0}
          showProPrefix={index > 1}
          showAdvancedPrefix={index > 2}
        />
      ))}
    </div>
  );
};

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <TooltipProvider delayDuration={300}>
      <section className="py-20 px-4" id="pricing">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-up">
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
              Nossos Planos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Escolha o Plano Ideal para o Seu Negócio
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-4">
              Soluções flexíveis para empresas de todos os tamanhos
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4 md:mb-0 md:mr-8">
                <MessageSquare className="h-5 w-5 text-gold" />
                <p className="text-lg font-semibold text-gold">
                  Mensagens ilimitadas em todos os planos
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4 md:mb-0 md:mr-8">
                <Calendar className="h-5 w-5 text-gold" />
                <p className="text-lg font-semibold text-gold">
                  7 dias de teste grátis
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <BarChart className="h-5 w-5 text-gold" />
                <p className="text-lg font-semibold text-gold">
                  Dashboard completo
                </p>
              </div>
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
              </span>
              {isAnnual && (
                <span className="ml-2 bg-gold/10 text-gold text-xs px-2 py-1 rounded-full">
                  Economia de até 30%
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <Button 
              variant="outline" 
              className="text-gold hover:text-gold/80 border-gold/20 hover:bg-gold/5 hover:border-gold/30 px-6"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? "Planos" : "Compare"}
            </Button>
          </div>

          <div className="transition-all duration-300">
            {showTable ? (
              <PricingFeatures isAnnual={isAnnual} />
            ) : (
              <PricingCards isAnnual={isAnnual} />
            )}
          </div>

          {/* FAQ Section */}
          <div className="mt-32">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {pricingFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default PricingTable;
