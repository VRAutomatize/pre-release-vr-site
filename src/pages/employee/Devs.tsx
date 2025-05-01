import React, { useState } from "react";
import { Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { EmbeddedForm } from "@/components/dashboard/EmbeddedForm";

const developersList = [
  { id: 1, name: "Carlos Santos", status: "available", specialty: "Frontend", lastActive: "Agora" },
  { id: 2, name: "Ana Silva", status: "busy", specialty: "Backend", lastActive: "Há 15 min" },
  { id: 3, name: "Marco Oliveira", status: "available", specialty: "Full Stack", lastActive: "Agora" },
  { id: 4, name: "Juliana Costa", status: "offline", specialty: "DevOps", lastActive: "Há 3 horas" },
];

const Devs = () => {
  const [devs, setDevs] = useState(developersList);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    setActiveForm({
      isOpen: true,
      url: "https://vrautomatize-n8n.snrhk1.easypanel.host/form/abrir_chamado",
      title: "Suporte Técnico",
      description: "Abra um chamado para solicitar suporte técnico dos desenvolvedores"
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

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gold">Desenvolvedores</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Verifique a disponibilidade dos desenvolvedores e solicite suporte técnico
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            className="border-gold/20 text-gold hover:bg-gold/10"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          <Card className="glass-blur border-gold/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gold/10 p-3 shadow-inner">
                  <Users className="h-5 w-5 text-gold" />
                </div>
                <CardTitle className="text-gold">Disponibilidade de Desenvolvedores</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {devs.map((dev) => (
                  <div 
                    key={dev.id}
                    className="flex flex-col p-4 rounded-lg border border-gold/20 bg-gold/5 backdrop-blur-sm shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{dev.name}</span>
                      <span className={`h-3 w-3 rounded-full ${
                        dev.status === "available" ? "bg-green-500" :
                        dev.status === "busy" ? "bg-amber-500" :
                        "bg-gray-400"
                      }`} />
                    </div>
                    <span className="text-sm text-gold/80">{dev.specialty}</span>
                    <span className="text-xs text-gold/70 mt-1">
                      Ativo: {dev.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-blur border-gold/20 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gold/10 p-3 shadow-inner">
                  <Users className="h-5 w-5 text-gold" />
                </div>
                <CardTitle className="text-gold">Suporte Técnico</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <p className="text-gold/80">
                Está enfrentando dificuldades técnicas ou precisa de suporte dos desenvolvedores?
                Abra um chamado usando o formulário abaixo:
              </p>
              <Button 
                onClick={openSupportForm}
                className="bg-gold hover:bg-gold/90 text-background"
              >
                Abrir Chamado de Suporte
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
};

export default Devs;
