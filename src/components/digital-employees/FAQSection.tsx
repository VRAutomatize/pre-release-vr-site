
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";

const FAQSection = () => {
  const { trackEvent } = useConversionAnalytics();

  const handleFAQClick = (question: string) => {
    trackEvent('faq_interaction', 'click', 'faq_item', 'faq_section', {
      question,
      source: 'digital_employees_page'
    });
  };

  const faqs = [
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Nossos clientes começam a ver resultados em 15-30 dias. A automação completa é implementada em até 90 dias, mas os primeiros processos automatizados entram em funcionamento nas primeiras semanas."
    },
    {
      question: "Como garantem o ROI prometido?",
      answer: "Temos uma metodologia comprovada com mais de 200 empresas atendidas. Fazemos uma análise detalhada dos seus processos antes de implementar, garantindo que a automação seja estratégica e mensurável. Oferecemos relatórios mensais de performance."
    },
    {
      question: "Minha equipe vai ficar desempregada?",
      answer: "Não! Os funcionários digitais substituem tarefas repetitivas, liberando sua equipe para atividades estratégicas de maior valor. Nossos clientes relatam maior satisfação dos funcionários que passam a focar em trabalho mais criativo e estratégico."
    },
    {
      question: "Preciso de conhecimento técnico?",
      answer: "Absolutamente não. Cuidamos de toda a implementação técnica. Você só precisa definir os processos que quer automatizar. Oferecemos treinamento completo para sua equipe operar os sistemas."
    },
    {
      question: "Como funciona a segurança dos dados?",
      answer: "Utilizamos as mesmas tecnologias de segurança de bancos: criptografia ponta-a-ponta, servidores certificados e backups automáticos. Seus dados ficam mais seguros que em planilhas locais."
    },
    {
      question: "E se minha empresa crescer muito?",
      answer: "Perfeito! Os funcionários digitais escalam automaticamente. Diferente de funcionários humanos, eles podem trabalhar 24/7 sem limites de capacidade. Quanto mais sua empresa cresce, maior o valor da automação."
    },
    {
      question: "Posso testar antes de decidir?",
      answer: "Sim! Oferecemos uma análise gratuita onde identificamos oportunidades específicas na sua empresa. Para empresários com faturamento acima de R$ 500k/mês, fazemos uma reunião executiva personalizada."
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-base md:text-lg text-foreground/90">
            Esclarecemos as principais dúvidas de empresários como você
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gold/20 rounded-lg p-4 md:p-6 bg-card/80 backdrop-blur-lg"
            >
              <AccordionTrigger 
                className="text-left hover:text-gold transition-colors py-2"
                onClick={() => handleFAQClick(faq.question)}
              >
                <span className="text-sm md:text-base font-medium pr-4 text-foreground">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pt-2 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-foreground/80 mb-4 text-sm md:text-base">
            Ainda tem dúvidas? Fale direto com nossos especialistas
          </p>
          <a
            href="https://wa.me/554792666367?text=Olá!%20Tenho%20algumas%20dúvidas%20sobre%20Funcionários%20Digitais"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium text-sm md:text-base"
            onClick={() => trackEvent('faq_whatsapp_click', 'click', 'whatsapp_link', 'faq_section')}
          >
            Conversar no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
