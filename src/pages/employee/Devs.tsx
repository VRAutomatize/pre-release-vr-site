
import React, { useState } from "react";
import { Users, RefreshCw, MessageSquare, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { EmbeddedForm } from "@/components/dashboard/EmbeddedForm";
import { useIsMobile } from "@/hooks/useIsMobile";
import NativeMobileLayout from "@/components/mobile/NativeMobileLayout";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";

const developersList = [
  { id: 1, name: "Carlos Santos", status: "available", specialty: "Frontend", lastActive: "Agora" },
  { id: 2, name: "Ana Silva", status: "busy", specialty: "Backend", lastActive: "Há 15 min" },
  { id: 3, name: "Marco Oliveira", status: "available", specialty: "Full Stack", lastActive: "Agora" },
  { id: 4, name: "Juliana Costa", status: "offline", specialty: "DevOps", lastActive: "Há 3 horas" },
  { id: 5, name: "Alexsander Costa", status: "available", specialty: "Diretor de Operações", lastActive: "Agora", availableHours: "09:00 - 19:00" },
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
  const isMobile = useIsMobile();

  const refreshData = () => {
    setIsRefreshing(true);
    toast.info("Atualizando disponibilidade dos desenvolvedores...");
    
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
  
  const contactWhatsApp = () => {
    const whatsappUrl = "https://wa.me/554788110195?text=Ativar%20Demo";
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500 text-green-100";
      case "busy": return "bg-amber-500 text-amber-100";
      default: return "bg-gray-500 text-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <Zap className="h-4 w-4" />;
      case "busy": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const DevsContent = () => (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">
              Desenvolvedores
            </h2>
            <p className="text-sm text-gray-400">
              Verifique disponibilidade e solicite suporte técnico
            </p>
          </div>
          <NativeButton 
            onClick={refreshData} 
            variant="secondary"
            size="sm"
            loading={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </NativeButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">3</div>
            <div className="text-xs text-gray-400">Disponíveis</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-amber-400 mb-1">1</div>
            <div className="text-xs text-gray-400">Ocupados</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-gray-400 mb-1">1</div>
            <div className="text-xs text-gray-400">Offline</div>
          </NativeCard>
        </div>
      </div>

      {/* Developers List */}
      <div className="px-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          Equipe de Desenvolvimento
        </h3>
        
        {devs.map((dev) => (
          <NativeCard key={dev.id} variant="elevated" padding="md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-100 truncate">
                      {dev.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {dev.specialty}
                    </p>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(dev.status)}`}>
                    {getStatusIcon(dev.status)}
                    {dev.status === "available" ? "Disponível" : 
                     dev.status === "busy" ? "Ocupado" : "Offline"}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Ativo: {dev.lastActive}
                  </span>
                  
                  {dev.availableHours && (
                    <span className="text-xs text-green-400 font-medium">
                      {dev.availableHours}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </NativeCard>
        ))}
      </div>

      {/* Support Actions */}
      <div className="px-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-100">
          Suporte Técnico
        </h3>
        
        <NativeCard variant="glass" padding="lg">
          <div className="text-center mb-6">
            <div className="h-16 w-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Precisa de Ajuda?
            </h4>
            <p className="text-sm text-gray-400 mb-6">
              Nossa equipe está pronta para te ajudar com qualquer dificuldade técnica
            </p>
          </div>
          
          <div className="space-y-3">
            <NativeButton 
              onClick={openSupportForm}
              variant="primary"
              fullWidth
            >
              Abrir Chamado de Suporte
            </NativeButton>
            
            <NativeButton 
              onClick={contactWhatsApp}
              variant="secondary"
              fullWidth
              className="bg-green-600/20 text-green-400 border-green-600/30"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contato via WhatsApp
            </NativeButton>
          </div>
        </NativeCard>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <NativeMobileLayout title="Desenvolvedores" subtitle="Suporte técnico disponível">
        <DevsContent />
      </NativeMobileLayout>
    );
  }

  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
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
                    {dev.availableHours && (
                      <span className="text-xs text-green-400 mt-1">
                        Horário: {dev.availableHours}
                      </span>
                    )}
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
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <Button 
                  onClick={openSupportForm}
                  className="bg-gold hover:bg-gold/90 text-background"
                >
                  Abrir Chamado de Suporte
                </Button>
                <Button 
                  onClick={contactWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contato via WhatsApp
                </Button>
              </div>
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
