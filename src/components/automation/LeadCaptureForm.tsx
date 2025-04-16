
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, Send } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    businessType: "",
    bottleneck: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsThankYouOpen(true);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        businessType: "",
        bottleneck: ""
      });
    }, 1500);
  };

  return (
    <>
      <section className="py-20 relative z-10" id="lead-capture-form">
        <div className="container mx-auto px-4">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <Search className="text-gold mr-2" />
                  <h2 className="text-2xl font-bold">
                    Vamos analisar sua operação gratuitamente
                  </h2>
                </div>
                
                <p className="mb-6 text-lg">
                  Preencha o formulário ao lado e receba uma sessão estratégica onde vamos te mostrar:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-gold/20 p-1 rounded-full mr-3 mt-1">
                      <Search className="h-4 w-4 text-gold" />
                    </div>
                    <p>Onde estão os gargalos da sua operação atual</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gold/20 p-1 rounded-full mr-3 mt-1">
                      <Search className="h-4 w-4 text-gold" />
                    </div>
                    <p>Como automatizar processos críticos sem perder o toque humano</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gold/20 p-1 rounded-full mr-3 mt-1">
                      <Search className="h-4 w-4 text-gold" />
                    </div>
                    <p>O impacto financeiro de manter tarefas manuais versus automatizadas</p>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessType">Tipo de negócio</Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      placeholder="Ex: E-commerce, Infoprodutos, Serviços..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bottleneck">Qual maior gargalo hoje?</Label>
                    <Textarea
                      id="bottleneck"
                      name="bottleneck"
                      value={formData.bottleneck}
                      onChange={handleChange}
                      placeholder="Descreva brevemente o principal problema que você gostaria de resolver"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-background hover:text-background font-bold py-3 h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Quero minha análise gratuita
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
        <DialogContent className="glass border-gold/20 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
              <CheckCircle className="text-gold mr-2" />
              Obrigado!
            </DialogTitle>
            <DialogDescription className="text-foreground text-lg pt-4">
              Em breve um especialista da nossa equipe vai entrar em contato para marcar sua sessão estratégica.
              <br /><br />
              Enquanto isso, confira um dos nossos cases e veja como já ajudamos empresas como a sua a faturar mais com menos esforço.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 glass p-6 rounded-lg">
            <h3 className="font-medium text-xl mb-2">Case de Sucesso: E-commerce de Cosméticos</h3>
            <p>Automação completa do atendimento e qualificação de leads permitiu um crescimento de 215% em vendas em apenas 3 meses, sem aumentar a equipe.</p>
            <a 
              href="https://wa.me/5547988558257?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20VR%20Automatize!%20Quero%20falar%20sobre%20automação."
              className="inline-flex items-center mt-4 text-gold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-4 w-4 mr-1" />
              Fale agora mesmo com um especialista
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadCaptureForm;
