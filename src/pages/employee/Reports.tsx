
import React, { useState, useCallback, useEffect } from "react";
import { FileText, Send, TrendingUp, BarChart } from "lucide-react";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { EmbeddedForm } from "@/components/dashboard/EmbeddedForm";
import { useIsMobile } from "@/hooks/useIsMobile";
import NativeMobileLayout from "@/components/mobile/NativeMobileLayout";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

    if (isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('form-overlay-open');
    }
  }, [isMobile]);

  const handleCloseForm = useCallback(() => {
    setActiveForm(prev => ({
      ...prev,
      isOpen: false
    }));

    if (isMobile) {
      document.body.style.overflow = '';
      document.body.classList.remove('form-overlay-open');
    }
  }, [isMobile]);

  const ReportsContent = () => (
    <div className="w-full space-y-8">
      {/* Header Section - Mobile Optimized */}
      <div className="px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-3">
          Gerar Relatórios
        </h2>
        <p className="text-base text-gray-200 leading-relaxed">
          Registre vendas e envie leads para maximizar suas comissões
        </p>
      </div>

      {/* Quick Stats - Enhanced Mobile Layout */}
      {isMobile && (
        <div className="px-6">
          <div className="grid grid-cols-2 gap-4">
            <NativeCard variant="elevated" padding="lg" className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">30%</div>
              <div className="text-sm text-gray-200 font-medium">Venda Direta</div>
            </NativeCard>
            
            <NativeCard variant="elevated" padding="lg" className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10%</div>
              <div className="text-sm text-gray-200 font-medium">Lead Qualificado</div>
            </NativeCard>
          </div>
        </div>
      )}

      {/* Report Options - Mobile First */}
      <div className="px-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Opções de Relatório
        </h3>

        {/* Direct Sale Card - Enhanced Mobile */}
        <NativeCard variant="elevated" padding="none" className="overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-green-400/10 rounded-xl">
                <FileText className="h-8 w-8 text-green-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-green-400 mb-3">
                  Gerar Venda Direta
                </h4>
                <p className="text-base text-gray-200 mb-4 leading-relaxed">
                  Registre uma venda fechada diretamente por você para ganhar comissão máxima.
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-400/20 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span className="text-base font-semibold text-green-400">30% Comissão</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-300">• Comissão: 30% do valor da venda</p>
                  <p className="text-sm text-gray-300">• Pagamento em até 7 dias úteis</p>
                  <p className="text-sm text-gray-300">• Requer validação da equipe comercial</p>
                </div>
              </div>
            </div>
            
            <NativeButton 
              onClick={() => handleOpenForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/gerar_venda_fdcore", "Gerar Venda", "Formulário para registrar uma nova venda no sistema")} 
              variant="primary"
              fullWidth
              size="lg"
              className="h-14 text-lg font-semibold"
            >
              Registrar Venda
            </NativeButton>
          </div>
        </NativeCard>

        {/* Lead Card - Enhanced Mobile */}
        <NativeCard variant="elevated" padding="none" className="overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-blue-400/10 rounded-xl">
                <Send className="h-8 w-8 text-blue-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-blue-400 mb-3">
                  Enviar Lead Qualificado
                </h4>
                <p className="text-base text-gray-200 mb-4 leading-relaxed">
                  Notifique o time comercial sobre um lead qualificado e ganhe comissão se fecharem.
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-400/20 rounded-full">
                    <BarChart className="h-5 w-5 text-blue-400" />
                    <span className="text-base font-semibold text-blue-400">10% Comissão</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-300">• Comissão: 10% se o time fechar a venda</p>
                  <p className="text-sm text-gray-300">• Lead deve estar qualificado</p>
                  <p className="text-sm text-gray-300">• Acompanhamento em tempo real</p>
                </div>
              </div>
            </div>
            
            <NativeButton 
              onClick={() => handleOpenForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/notifica_time_comercial", "Notificar Time Comercial", "Envie uma notificação importante para o time comercial")} 
              variant="secondary"
              fullWidth
              size="lg"
              className="h-14 text-lg font-semibold"
            >
              Enviar Lead
            </NativeButton>
          </div>
        </NativeCard>
      </div>

      {/* Tips Section - Mobile Optimized */}
      <div className="px-6 pb-8">
        <NativeCard variant="glass" padding="lg">
          <div className="text-center space-y-6">
            <div className="h-20 w-20 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-10 w-10 text-yellow-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-100">
              Dicas para Maximizar Comissões
            </h4>
            <div className="text-base text-gray-200 text-left space-y-3">
              <p>• Qualifique bem os leads antes de enviar</p>
              <p>• Mantenha relacionamento pós-venda</p>
              <p>• Use os materiais de apoio disponíveis</p>
              <p>• Acompanhe métricas no dashboard</p>
            </div>
          </div>
        </NativeCard>
      </div>

      {/* Form Modal */}
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
      <NativeMobileLayout title="Relatórios" subtitle="Registre vendas e leads">
        <ReportsContent />
      </NativeMobileLayout>
    );
  }

  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image - only for desktop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <h1 className="font-bold text-gold text-xl md:text-2xl">
              Gerar Relatório
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Selecione uma das opções abaixo para iniciar o processo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                  className="w-full bg-gold hover:bg-gold/90 text-background h-12"
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
                  className="w-full bg-gold hover:bg-gold/90 text-background h-12"
                >
                  Abrir Formulário
                </Button>
              </CardContent>
            </Card>
          </div>

          <EmbeddedForm 
            isOpen={activeForm.isOpen} 
            onClose={handleCloseForm} 
            title={activeForm.title} 
            description={activeForm.description} 
            formUrl={activeForm.url} 
          />
        </div>
      </main>
    </div>
  );
};

export default Reports;
