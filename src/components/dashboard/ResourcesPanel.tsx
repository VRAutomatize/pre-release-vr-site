import React from "react";
import { FileText, Play, Book, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ResourcesPanel = () => {
  const [activeTab, setActiveTab] = React.useState("contracts");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleResourceClick = (title: string) => {
    if (title === "WhatsApp Demo") {
      handleWhatsAppDemoClick();
    } else {
      toast.info(`Acessando recurso: ${title}`);
    }
  };
  
  const handleWhatsAppDemoClick = () => {
    // Open the specified WhatsApp link in a new tab
    const whatsappUrl = "https://wa.me/554788110195?text=Ativar%20Demo";
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gold">Recursos para Vendas</h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-background/40 backdrop-blur-md border border-gold/20 mb-6">
          <TabsTrigger value="contracts" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Documentos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="demos" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span className="hidden md:inline">Demos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="scripts" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden md:inline">Scripts</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden md:inline">Vídeos</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        {/* Contracts Tab */}
        <TabsContent value="contracts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard icon={<FileText className="h-5 w-5 text-gold" />} title="Contrato Padrão" description="Modelo de contrato para serviços de automação" onClick={() => handleResourceClick("Contrato Padrão")} />
            <ResourceCard icon={<FileText className="h-5 w-5 text-gold" />} title="Contrato Premium" description="Modelo de contrato para serviços premium" onClick={() => handleResourceClick("Contrato Premium")} />
            <ResourceCard icon={<FileText className="h-5 w-5 text-gold" />} title="Termo de Adesão" description="Documento para adesão aos serviços da VR" onClick={() => handleResourceClick("Termo de Adesão")} />
            <ResourceCard icon={<FileText className="h-5 w-5 text-gold" />} title="NDA" description="Acordo de confidencialidade para compartilhamento de dados" onClick={() => handleResourceClick("NDA")} />
          </div>
        </TabsContent>
        
        {/* Demos Tab - Updated to redirect to WhatsApp link */}
        <TabsContent value="demos" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            <ResourceCard icon={<Play className="h-5 w-5 text-gold" />} title="WhatsApp Demo" description="Demonstração ao vivo do atendente digital no WhatsApp" onClick={handleWhatsAppDemoClick} />
          </div>
        </TabsContent>
        
        {/* Scripts Tab */}
        <TabsContent value="scripts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard icon={<Book className="h-5 w-5 text-gold" />} title="Script Inicial" description="Script para primeiro contato com potenciais clientes" onClick={() => handleResourceClick("Script Inicial")} />
            <ResourceCard icon={<Book className="h-5 w-5 text-gold" />} title="Objeções Comuns" description="Como responder às objeções mais frequentes" onClick={() => handleResourceClick("Objeções Comuns")} />
            <ResourceCard icon={<Book className="h-5 w-5 text-gold" />} title="Fechamento" description="Técnicas para fechamento de vendas" onClick={() => handleResourceClick("Fechamento")} />
            <ResourceCard icon={<Book className="h-5 w-5 text-gold" />} title="Pós-Venda" description="Script para acompanhamento pós-venda" onClick={() => handleResourceClick("Pós-Venda")} />
          </div>
        </TabsContent>
        
        {/* Videos Tab */}
        <TabsContent value="videos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard icon={<Video className="h-5 w-5 text-gold" />} title="Apresentação da Empresa" description="Vídeo institucional sobre a VR Automatize" onClick={() => handleResourceClick("Apresentação da Empresa")} />
            <ResourceCard icon={<Video className="h-5 w-5 text-gold" />} title="Conteúdos Funcionário Digital Core" description="Vídeos explicativos sobre o produto Funcionário Digital Core" onClick={() => handleResourceClick("Conteúdos Funcionário Digital Core")} />
            <ResourceCard icon={<Video className="h-5 w-5 text-gold" />} title="Case de Sucesso" description="Entrevista com clientes satisfeitos" onClick={() => handleResourceClick("Case de Sucesso")} />
            <ResourceCard icon={<Video className="h-5 w-5 text-gold" />} title="Conteúdos Funcionário Digital Pro" description="Vídeos sobre os recursos básicos do produto Pro" onClick={() => handleResourceClick("Conteúdos Funcionário Digital Pro")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};

// Resource Card Component
const ResourceCard = ({
  icon,
  title,
  description,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return <Card className="glass-blur border-gold/20 hover:border-gold/40 transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gold/10 p-3 shadow-inner">
            {icon}
          </div>
          <CardTitle className="text-gold text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="text-gold/70 mb-4">{description}</CardDescription>
        <button type="button" className="text-sm font-medium text-gold hover:underline flex items-center">
          Acessar recurso
        </button>
      </CardContent>
    </Card>;
};

export default ResourcesPanel;
