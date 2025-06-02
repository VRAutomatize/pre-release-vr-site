
import React, { useState } from "react";
import { Download, ExternalLink, FileText, Video, Image, BookOpen, Play, Book } from "lucide-react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";
import { motion } from "framer-motion";

const MobileResourcesView = () => {
  const [activeCategory, setActiveCategory] = useState("contracts");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleResourceClick = (title: string) => {
    if (title === "WhatsApp Demo") {
      const whatsappUrl = "https://wa.me/554788110195?text=Ativar%20Demo";
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open("https://wa.me/554788110195?text=Solicitar%20recurso:%20" + encodeURIComponent(title), '_blank');
    }
  };

  const categories = [
    { id: "contracts", name: "Contratos", icon: FileText },
    { id: "demos", name: "Demos", icon: Play },
    { id: "scripts", name: "Scripts", icon: Book },
    { id: "videos", name: "Vídeos", icon: Video }
  ];

  const resources = {
    contracts: [
      {
        title: "Contrato Funcionário Digital Core",
        description: "Modelo de contrato para o Funcionário Digital da Versão Core",
        icon: FileText
      },
      {
        title: "Contrato Funcionário Digital Pro",
        description: "Modelo de contrato para o Funcionário Digital da Versão Pro",
        icon: FileText
      },
      {
        title: "Termo de Adesão",
        description: "Documento para adesão aos serviços da VR",
        icon: FileText
      },
      {
        title: "NDA",
        description: "Acordo de confidencialidade para compartilhamento de dados",
        icon: FileText
      }
    ],
    demos: [
      {
        title: "WhatsApp Demo",
        description: "Demonstração ao vivo do atendente digital no WhatsApp",
        icon: Play,
        featured: true
      }
    ],
    scripts: [
      {
        title: "Script Inicial",
        description: "Script para primeiro contato com potenciais clientes",
        icon: Book
      },
      {
        title: "Objeções Comuns",
        description: "Como responder às objeções mais frequentes",
        icon: Book
      },
      {
        title: "Fechamento",
        description: "Técnicas para fechamento de vendas",
        icon: Book
      },
      {
        title: "Pós-Venda",
        description: "Script para acompanhamento pós-venda",
        icon: Book
      }
    ],
    videos: [
      {
        title: "Apresentação da Empresa",
        description: "Vídeo institucional sobre a VR Automatize",
        icon: Video
      },
      {
        title: "Conteúdos Funcionário Digital Core",
        description: "Vídeos explicativos sobre o produto Funcionário Digital Core",
        icon: Video
      },
      {
        title: "Case de Sucesso",
        description: "Entrevista com clientes satisfeitos",
        icon: Video
      },
      {
        title: "Conteúdos Funcionário Digital Pro",
        description: "Vídeos sobre os recursos básicos do produto Pro",
        icon: Video
      }
    ]
  };

  return (
    <motion.div 
      className="w-full space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="px-4 py-3" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Recursos de Vendas
        </h2>
        <p className="text-sm text-gray-400">
          Materiais e ferramentas para otimizar suas apresentações e fechar mais vendas
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div className="px-4" variants={itemVariants}>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <NativeButton
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap flex-shrink-0"
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </NativeButton>
            );
          })}
        </div>
      </motion.div>

      {/* Resources List */}
      <motion.div className="px-4 space-y-3" variants={itemVariants}>
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {resources[activeCategory].map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <NativeCard 
                  variant={resource.featured ? "glass" : "elevated"} 
                  padding="md" 
                  interactive
                  onClick={() => handleResourceClick(resource.title)}
                  className={resource.featured ? "border-yellow-400/30 bg-yellow-400/5" : ""}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      resource.featured 
                        ? "bg-yellow-400/20 text-yellow-400" 
                        : "bg-gray-700/50 text-gray-400"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold mb-1 ${
                        resource.featured ? "text-yellow-400" : "text-gray-100"
                      }`}>
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {resource.description}
                      </p>
                      
                      {resource.featured && (
                        <div className="flex items-center gap-2 text-xs text-yellow-400">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          Disponível agora
                        </div>
                      )}
                    </div>
                    
                    <ExternalLink className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  </div>
                </NativeCard>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Quick Action Section */}
      <motion.div className="px-4 pb-6" variants={itemVariants}>
        <NativeCard variant="glass" padding="lg" className="text-center">
          <motion.div 
            className="mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-16 w-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="h-8 w-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Precisa de recursos específicos?
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Entre em contato conosco para solicitar materiais personalizados
            </p>
          </motion.div>
          
          <NativeButton 
            variant="primary" 
            fullWidth
            className="transition-all duration-200 hover:scale-105"
            onClick={() => window.open("https://wa.me/554788110195?text=Solicitar%20recursos%20personalizados", '_blank')}
          >
            Solicitar Recursos
          </NativeButton>
        </NativeCard>
      </motion.div>
    </motion.div>
  );
};

export default MobileResourcesView;
