
import React, { useState } from "react";
import { Users, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import EmployeeSidebar from "@/components/EmployeeSidebar";

const developersList = [
  { id: 1, name: "Carlos Santos", status: "available", specialty: "Frontend", lastActive: "Agora" },
  { id: 2, name: "Ana Silva", status: "busy", specialty: "Backend", lastActive: "Há 15 min" },
  { id: 3, name: "Marco Oliveira", status: "available", specialty: "Full Stack", lastActive: "Agora" },
  { id: 4, name: "Juliana Costa", status: "offline", specialty: "DevOps", lastActive: "Há 3 horas" },
];

const Devs = () => {
  const [devs, setDevs] = useState(developersList);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    toast.info("Atualizando disponibilidade dos desenvolvedores...");
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dados de disponibilidade atualizados!");
    }, 1500);
  };
  
  const openSupportForm = () => {
    window.open("https://vrautomatize-n8n.snrhk1.easypanel.host/form/abrir_chamado", "_blank");
  };

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gold">Desenvolvedores</h1>
            <p className="text-muted-foreground">
              Verifique a disponibilidade dos desenvolvedores e solicite suporte técnico
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            className="border-gold/20 text-gold"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" />
                <CardTitle>Disponibilidade de Desenvolvedores</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {devs.map((dev) => (
                  <div 
                    key={dev.id}
                    className="flex flex-col p-4 rounded-lg border border-gold/10 bg-background"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{dev.name}</span>
                      <span className={`h-3 w-3 rounded-full ${
                        dev.status === "available" ? "bg-green-500" :
                        dev.status === "busy" ? "bg-amber-500" :
                        "bg-gray-400"
                      }`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{dev.specialty}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Ativo: {dev.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gold" />
                <CardTitle>Suporte Técnico</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <p>
                Está enfrentando dificuldades técnicas ou precisa de suporte dos desenvolvedores?
                Abra um chamado usando o formulário abaixo:
              </p>
              <Button 
                onClick={openSupportForm}
                className="bg-gold hover:bg-gold/90 text-background"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Abrir Chamado de Suporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Devs;
