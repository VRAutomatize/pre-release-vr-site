
import React from "react";
import { Download, ExternalLink, FileText, Video, Image, BookOpen } from "lucide-react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";

const MobileResourcesView = () => {
  const resources = [
    {
      id: 1,
      title: "Manual de Vendas VR",
      description: "Guia completo para apresentações de vendas",
      type: "PDF",
      icon: <FileText className="h-6 w-6" />,
      downloadUrl: "#",
      size: "2.3 MB"
    },
    {
      id: 2,
      title: "Vídeo Demonstração",
      description: "Apresentação dos produtos e serviços",
      type: "Vídeo",
      icon: <Video className="h-6 w-6" />,
      downloadUrl: "#",
      size: "45 MB"
    },
    {
      id: 3,
      title: "Catálogo de Produtos",
      description: "Portfólio completo de soluções VR",
      type: "PDF",
      icon: <BookOpen className="h-6 w-6" />,
      downloadUrl: "#",
      size: "8.1 MB"
    },
    {
      id: 4,
      title: "Logotipos e Identidade",
      description: "Arquivos de marca para apresentações",
      type: "ZIP",
      icon: <Image className="h-6 w-6" />,
      downloadUrl: "#",
      size: "15 MB"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Vídeo": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ZIP": return "bg-green-500/10 text-green-400 border-green-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="px-4 py-3">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Recursos de Vendas
        </h2>
        <p className="text-sm text-gray-400">
          Materiais e ferramentas para otimizar suas apresentações e fechar mais vendas
        </p>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
            <div className="text-xs text-gray-400">Recursos</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
            <div className="text-xs text-gray-400">Taxa Sucesso</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">247</div>
            <div className="text-xs text-gray-400">Downloads</div>
          </NativeCard>
        </div>
      </div>

      {/* Resources List */}
      <div className="px-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          Materiais Disponíveis
        </h3>
        
        {resources.map((resource) => (
          <NativeCard key={resource.id} variant="elevated" padding="md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-yellow-400/10 rounded-xl text-yellow-400">
                {resource.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-100 truncate">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {resource.description}
                    </p>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ml-2 ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {resource.size}
                  </span>
                  
                  <div className="flex gap-2">
                    <NativeButton variant="ghost" size="sm" className="h-8 px-3">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Abrir
                    </NativeButton>
                    
                    <NativeButton variant="secondary" size="sm" className="h-8 px-3">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </NativeButton>
                  </div>
                </div>
              </div>
            </div>
          </NativeCard>
        ))}
      </div>

      {/* Action Section */}
      <div className="px-4 pb-6">
        <NativeCard variant="glass" padding="lg" className="text-center">
          <div className="mb-4">
            <div className="h-16 w-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="h-8 w-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Precisa de mais recursos?
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Solicite materiais personalizados ou sugira novos recursos
            </p>
          </div>
          
          <NativeButton variant="primary" fullWidth>
            Solicitar Recursos
          </NativeButton>
        </NativeCard>
      </div>
    </div>
  );
};

export default MobileResourcesView;
