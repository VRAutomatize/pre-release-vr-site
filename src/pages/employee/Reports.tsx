
import React, { useState, useCallback, useEffect } from "react";
import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { EmbeddedForm } from "@/components/dashboard/EmbeddedForm";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileLayout from "@/components/mobile/MobileLayout";

const Reports = () => {
  const [activeForm, setActiveForm] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
    description: ""
  });
  const isMobile = useIsMobile();

  // Clean up effect to ensure body classes are removed when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('form-overlay-open');
    };
  }, []);

  const handleOpenForm = useCallback((url: string, title: string, description?: string) => {
    setActiveForm({
      isOpen: true,
      url,
      title,
      description
    });

    // Para dispositivos móveis, evitamos rolagem no body quando o form está aberto
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      // Adiciona uma classe específica para mobile para ajudar na estilização
      document.body.classList.add('form-overlay-open');
    }
  }, [isMobile]);

  const handleCloseForm = useCallback(() => {
    setActiveForm(prev => ({
      ...prev,
      isOpen: false
    }));

    // Restaura a rolagem quando o formulário é fechado
    if (isMobile) {
      document.body.style.overflow = '';
      document.body.classList.remove('form-overlay-open');
    }
  }, [isMobile]);

  // Verificar se estamos em ambiente de desenvolvimento para usar URLs de teste se necessário
  const isDevEnvironment = import.meta.env.DEV;
  const getFormUrl = (url: string) => {
    // Se estivermos em desenvolvimento e a URL não estiver definida ou for inválida,
    // podemos fornecer um fallback para teste
    if (isDevEnvironment && (!url || url === "")) {
      return "https://example.com/form-placeholder";
    }
    return url;
  };

  const ReportsContent = () => (
    <div className={`${isMobile ? 'mobile-container mobile-spacing' : 'relative'}`}>
      {/* Gold blurred background image - only for desktop */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'mb-4' : 'mb-6'} relative z-10`}>
        <h1 className={`font-bold text-gold ${isMobile ? 'text-xl' : 'text-xl md:text-2xl'}`}>
          Gerar Relatório
        </h1>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-sm md:text-base'}`}>
          Selecione uma das opções abaixo para iniciar o processo
        </p>
      </div>

      <div className={`${isMobile ? 'mobile-spacing' : 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'} relative z-10`}>
        <Card className="glass-blur border-gold/20 card-hover shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gold/10 p-3 shadow-inner">
                <FileText className="h-5 w-5 text-gold" />
              </div>
              <CardTitle className="text-gold">Gerar Venda</CardTitle>
            </div>
            <CardDescription className="text-gold/70">
              Preencha o formulário para registrar uma nova venda no sistema. Uma venda direta contabiliza 30% de comissão!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleOpenForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/gerar_venda_fdcore", "Gerar Venda", "Formulário para registrar uma nova venda no sistema")} 
              className={`w-full bg-gold hover:bg-gold/90 text-background ${isMobile ? 'h-12' : ''}`}
            >
              Abrir Formulário
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-blur border-gold/20 card-hover shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gold/10 p-3 shadow-inner">
                <Send className="h-5 w-5 text-gold" />
              </div>
              <CardTitle className="text-gold">Notificar Time Comercial</CardTitle>
            </div>
            <CardDescription className="text-gold/70">
              Envie um Lead para o time comercial. Se eles fecharem, você recebe 10% de comissão!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleOpenForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/notifica_time_comercial", "Notificar Time Comercial", "Envie uma notificação importante para o time comercial")} 
              className={`w-full bg-gold hover:bg-gold/90 text-background ${isMobile ? 'h-12' : ''}`}
            >
              Abrir Formulário
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Use our enhanced form component that now supports both direct rendering and iframes */}
      <EmbeddedForm 
        isOpen={activeForm.isOpen} 
        onClose={handleCloseForm} 
        title={activeForm.title} 
        description={activeForm.description} 
        formUrl={activeForm.url} 
      />
    </div>
  );
  
  if (isMobile) {
    return (
      <MobileLayout title="Relatórios" showBackButton={false}>
        <ReportsContent />
      </MobileLayout>
    );
  }

  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        <ReportsContent />
      </main>
    </div>
  );
};

export default Reports;
