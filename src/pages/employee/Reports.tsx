
import React, { useState } from "react";
import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { EmbeddedForm } from "@/components/dashboard/EmbeddedForm";

const Reports = () => {
  const [activeForm, setActiveForm] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
  });

  const handleOpenForm = (url: string, title: string) => {
    setActiveForm({
      isOpen: true,
      url,
      title,
    });
  };

  const handleCloseForm = () => {
    setActiveForm((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Large blurred logo in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <img 
            src="/favicon.ico" 
            alt="VR Automatize" 
            className="w-[80%] max-w-[800px] object-contain"
          />
        </div>

        <div className="mb-6 relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-gold">Gerar Relatório</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Selecione uma das opções abaixo para iniciar o processo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
          <Card className="glass-blur border-gold/20 card-hover shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/10 p-3 shadow-inner">
                  <FileText className="h-5 w-5 text-gold" />
                </div>
                <CardTitle className="text-gold">Gerar Venda</CardTitle>
              </div>
              <CardDescription className="text-gold/70">
                Preencha o formulário para registrar uma nova venda no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleOpenForm(
                  "https://vrautomatize-n8n.snrhk1.easypanel.host/form/gerar_venda_fdcore",
                  "Gerar Venda"
                )}
                className="w-full bg-gold hover:bg-gold/90 text-background"
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
                Envie uma notificação importante para o time comercial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleOpenForm(
                  "https://vrautomatize-n8n.snrhk1.easypanel.host/form/notifica_time_comercial",
                  "Notificar Time Comercial"
                )}
                className="w-full bg-gold hover:bg-gold/90 text-background"
              >
                Abrir Formulário
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Embed the form with our improved component */}
        <EmbeddedForm
          isOpen={activeForm.isOpen}
          onClose={handleCloseForm}
          title={activeForm.title}
          formUrl={activeForm.url}
        />
      </main>
    </div>
  );
};

export default Reports;
