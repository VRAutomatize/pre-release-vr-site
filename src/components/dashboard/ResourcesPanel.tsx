
import React from "react";
import { FileText, Video, Headphones, Book } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResourcesPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gold">Recursos para Vendas</h2>
      </div>
      
      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-background/40 backdrop-blur-md border border-gold/20 mb-6">
          <TabsTrigger value="contracts" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Contratos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="demos" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span className="hidden md:inline">Contatos Demo</span>
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
            <ResourceCard 
              icon={<FileText className="h-5 w-5 text-gold" />}
              title="Contrato Padrão" 
              description="Modelo de contrato para serviços de automação"
              link="#"
            />
            <ResourceCard 
              icon={<FileText className="h-5 w-5 text-gold" />}
              title="Contrato Premium" 
              description="Modelo de contrato para serviços premium"
              link="#"
            />
            <ResourceCard 
              icon={<FileText className="h-5 w-5 text-gold" />}
              title="Termo de Adesão" 
              description="Documento para adesão aos serviços da VR"
              link="#"
            />
            <ResourceCard 
              icon={<FileText className="h-5 w-5 text-gold" />}
              title="NDA" 
              description="Acordo de confidencialidade para compartilhamento de dados"
              link="#"
            />
          </div>
        </TabsContent>
        
        {/* Demos Tab */}
        <TabsContent value="demos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard 
              icon={<Headphones className="h-5 w-5 text-gold" />}
              title="CRM Demo" 
              description="Acesso demo ao CRM para apresentação"
              link="#"
            />
            <ResourceCard 
              icon={<Headphones className="h-5 w-5 text-gold" />}
              title="Chat Bot Demo" 
              description="Demonstração ao vivo de chatbot para potenciais clientes"
              link="#"
            />
            <ResourceCard 
              icon={<Headphones className="h-5 w-5 text-gold" />}
              title="Automação Demo" 
              description="Demo interativa de automação de processos"
              link="#"
            />
            <ResourceCard 
              icon={<Headphones className="h-5 w-5 text-gold" />}
              title="Atendente Virtual" 
              description="Demonstração de assistente virtual para clientes"
              link="#"
            />
          </div>
        </TabsContent>
        
        {/* Scripts Tab */}
        <TabsContent value="scripts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard 
              icon={<Book className="h-5 w-5 text-gold" />}
              title="Script Inicial" 
              description="Script para primeiro contato com potenciais clientes"
              link="#"
            />
            <ResourceCard 
              icon={<Book className="h-5 w-5 text-gold" />}
              title="Objeções Comuns" 
              description="Como responder às objeções mais frequentes"
              link="#"
            />
            <ResourceCard 
              icon={<Book className="h-5 w-5 text-gold" />}
              title="Fechamento" 
              description="Técnicas para fechamento de vendas"
              link="#"
            />
            <ResourceCard 
              icon={<Book className="h-5 w-5 text-gold" />}
              title="Pós-Venda" 
              description="Script para acompanhamento pós-venda"
              link="#"
            />
          </div>
        </TabsContent>
        
        {/* Videos Tab */}
        <TabsContent value="videos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard 
              icon={<Video className="h-5 w-5 text-gold" />}
              title="Apresentação da Empresa" 
              description="Vídeo institucional sobre a VR Automatize"
              link="#"
            />
            <ResourceCard 
              icon={<Video className="h-5 w-5 text-gold" />}
              title="CRM em Ação" 
              description="Demonstração em vídeo do CRM em funcionamento"
              link="#"
            />
            <ResourceCard 
              icon={<Video className="h-5 w-5 text-gold" />}
              title="Case de Sucesso" 
              description="Entrevista com clientes satisfeitos"
              link="#"
            />
            <ResourceCard 
              icon={<Video className="h-5 w-5 text-gold" />}
              title="Tutorial de Apresentação" 
              description="Como apresentar os produtos VR para clientes"
              link="#"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ 
  icon, 
  title, 
  description, 
  link 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
}) => {
  return (
    <Card className="glass-blur border-gold/20 hover:border-gold/40 transition-all hover:shadow-md">
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
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm font-medium text-gold hover:underline flex items-center"
        >
          Acessar recurso
        </a>
      </CardContent>
    </Card>
  );
};

export default ResourcesPanel;
