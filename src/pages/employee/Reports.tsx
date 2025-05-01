
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
    description: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
    description: "",
  });

  const handleOpenForm = (url: string, title: string, description: string) => {
    setActiveForm({
      isOpen: true,
      url,
      title,
      description,
    });
  };

  const handleCloseForm = () => {
    setActiveForm((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh] w-full">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gold">Gerar Relatório</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Selecione uma das opções abaixo para iniciar o processo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="glass-card card-hover">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/10 p-3">
                  <FileText className="h-5 w-5 text-gold" />
                </div>
                <CardTitle>Gerar Venda</CardTitle>
              </div>
              <CardDescription>
                Preencha o formulário para registrar uma nova venda no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleOpenForm(
                  "https://vrautomatize-n8n.snrhk1.easypanel.host/form/gerar_venda_fdcore",
                  "Gerar Venda",
                  "Preencha o formulário para registrar uma nova venda no sistema"
                )}
                className="w-full bg-gold hover:bg-gold/90 text-background"
              >
                Abrir Formulário
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card card-hover">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gold/10 p-3">
                  <Send className="h-5 w-5 text-gold" />
                </div>
                <CardTitle>Notificar Time Comercial</CardTitle>
              </div>
              <CardDescription>
                Envie uma notificação importante para o time comercial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleOpenForm(
                  "https://vrautomatize-n8n.snrhk1.easypanel.host/form/notifica_time_comercial",
                  "Notificar Time Comercial",
                  "Envie uma notificação importante para o time comercial"
                )}
                className="w-full bg-gold hover:bg-gold/90 text-background"
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
      </main>
    </div>
  );
}

export default Reports;
