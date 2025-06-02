
import React from "react";
import { Wallet, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";
import NativeEmptyState from "@/components/mobile/NativeEmptyState";
import { motion } from "framer-motion";

const MobileCommissionsView = () => {
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
          Minhas Comissões
        </h2>
        <p className="text-sm text-gray-400">
          Acompanhe seus ganhos e solicite saques das comissões disponíveis
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div className="px-4" variants={itemVariants}>
        <div className="grid grid-cols-1 gap-3 mb-4">
          <NativeCard variant="elevated" padding="md" className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Saldo Disponível</p>
                <p className="text-2xl font-bold text-yellow-400">R$ 0,00</p>
                <p className="text-xs text-gray-500 mt-1">Pronto para saque</p>
              </div>
              <div className="h-12 w-12 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <Wallet className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </NativeCard>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-xl font-bold text-green-400 mb-1">R$ 0,00</div>
            <div className="text-xs text-gray-400">Total Recebido</div>
          </NativeCard>
          
          <NativeCard variant="elevated" padding="sm" className="text-center">
            <div className="text-xl font-bold text-blue-400 mb-1">R$ 0,00</div>
            <div className="text-xs text-gray-400">Este Mês</div>
          </NativeCard>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="px-4" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-100 mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1 transition-all duration-200 hover:scale-105"
            disabled
          >
            <Wallet className="h-5 w-5" />
            <span className="text-xs">Solicitar Saque</span>
          </NativeButton>
          
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1 transition-all duration-200 hover:scale-105"
            onClick={() => window.location.href = "/employee/reports"}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Ver Relatório</span>
          </NativeButton>
        </div>
      </motion.div>

      {/* Empty State for Commissions */}
      <motion.div className="px-4" variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-100">Histórico de Comissões</h3>
        </div>
        
        <NativeEmptyState
          icon={<Wallet className="h-8 w-8" />}
          title="Nenhuma comissão ainda"
          description="Suas comissões aparecerão aqui conforme você realizar vendas. Comece acessando nossos recursos de vendas."
          actionLabel="Ver Recursos"
          onAction={() => window.location.href = "/employee/dashboard?tab=resources"}
        />
      </motion.div>

      {/* Info Section */}
      <motion.div className="px-4 pb-6" variants={itemVariants}>
        <NativeCard variant="glass" padding="lg">
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Como funciona?
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Suas comissões são calculadas automaticamente quando uma venda é confirmada. Os pagamentos são processados semanalmente.
            </p>
            
            <NativeButton 
              variant="ghost" 
              fullWidth
              className="transition-all duration-200 hover:scale-105"
              onClick={() => window.open("https://wa.me/554788110195?text=Gostaria%20de%20saber%20mais%20sobre%20comissões", '_blank')}
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Saiba Mais
            </NativeButton>
          </div>
        </NativeCard>
      </motion.div>
    </motion.div>
  );
};

export default MobileCommissionsView;
