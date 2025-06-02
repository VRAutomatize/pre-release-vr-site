
import React from "react";
import { Download, ExternalLink, FileText, Video, Image, BookOpen } from "lucide-react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";
import NativeEmptyState from "@/components/mobile/NativeEmptyState";
import { motion } from "framer-motion";

const MobileResourcesView = () => {
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

      {/* Quick Stats - Real data will be integrated later */}
      <motion.div className="px-4" variants={itemVariants}>
        <div className="grid grid-cols-3 gap-3">
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">0</div>
            <div className="text-xs text-gray-400">Recursos</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">0%</div>
            <div className="text-xs text-gray-400">Taxa Sucesso</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
            <div className="text-xs text-gray-400">Downloads</div>
          </NativeCard>
        </div>
      </motion.div>

      {/* Empty State for Resources */}
      <motion.div className="px-4 space-y-3" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-100 mb-3">
          Materiais Disponíveis
        </h3>
        
        <NativeEmptyState
          icon={<BookOpen className="h-8 w-8" />}
          title="Recursos em preparação"
          description="Nossa equipe está preparando materiais exclusivos para você. Em breve você terá acesso a contratos, scripts, vídeos e muito mais."
          actionLabel="Entrar em Contato"
          onAction={() => window.open("https://wa.me/554788110195?text=Gostaria%20de%20acessar%20os%20recursos", '_blank')}
        />
      </motion.div>

      {/* Action Section */}
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
