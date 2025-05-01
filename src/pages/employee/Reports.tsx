
import React from "react";
import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeSidebar from "@/components/EmployeeSidebar";

const Reports = () => {
  const openForm = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gold">Gerar Relatório</h1>
          <p className="text-muted-foreground">
            Selecione uma das opções abaixo para iniciar o processo externo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gold/20 bg-background/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gold/10 p-2">
                  <FileText className="h-4 w-4 text-gold" />
                </div>
                <CardTitle>Gerar Venda</CardTitle>
              </div>
              <CardDescription>
                Preencha o formulário para registrar uma nova venda no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => openForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/gerar_venda_fdcore")}
                className="w-full bg-gold hover:bg-gold/90 text-background"
              >
                Abrir Formulário
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gold/20 bg-background/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gold/10 p-2">
                  <Send className="h-4 w-4 text-gold" />
                </div>
                <CardTitle>Notificar Time Comercial</CardTitle>
              </div>
              <CardDescription>
                Envie uma notificação importante para o time comercial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => openForm("https://vrautomatize-n8n.snrhk1.easypanel.host/form/notifica_time_comercial")}
                className="w-full bg-gold hover:bg-gold/90 text-background"
              >
                Abrir Formulário
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
