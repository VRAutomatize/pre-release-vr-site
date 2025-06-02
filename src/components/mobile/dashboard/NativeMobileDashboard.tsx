
import React, { useState } from "react";
import { RefreshCw, BarChart, Users, DollarSign, Wallet, TrendingUp, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NativeButton } from "@/components/ui/native-button";
import { NativeCard } from "@/components/ui/native-card";
import NativeMetricsCard from "@/components/mobile/NativeMetricsCard";
import NativeEmptyState from "@/components/mobile/NativeEmptyState";
import { motion } from "framer-motion";

interface NativeMobileDashboardProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onNavigateToCommissions: () => void;
  onNavigateToReports: () => void;
}

const NativeMobileDashboard = ({ 
  isRefreshing, 
  onRefresh, 
  onNavigateToCommissions,
  onNavigateToReports 
}: NativeMobileDashboardProps) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

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
      {/* Welcome Section with Gradient */}
      <motion.div className="relative overflow-hidden" variants={itemVariants}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/5" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h1 
                className="text-2xl font-bold text-yellow-400 mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Olá, {user?.name?.split(' ')[0] || "Colaborador"}! 👋
              </motion.h1>
              <p className="text-sm text-gray-400">
                Conecte seus dados para ver métricas em tempo real
              </p>
            </div>
            
            <NativeButton
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-10 w-10 p-0 rounded-full"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
            </NativeButton>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div className="px-4 space-y-4" variants={itemVariants}>
        <NativeMetricsCard
          title="Comissões Disponíveis"
          value="R$ 0,00"
          subtitle="Aguardando primeira venda"
          icon={<Wallet className="h-6 w-6" />}
          trend="neutral"
          trendValue="Meta: R$ 1.000"
          variant="featured"
          className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/20"
        />
        
        <div className="grid grid-cols-2 gap-3">
          <NativeMetricsCard
            title="Vendas do Mês"
            value="R$ 0,00"
            icon={<BarChart className="h-5 w-5" />}
            trend="neutral"
            trendValue="Primeira venda"
            variant="compact"
          />
          <NativeMetricsCard
            title="Leads Captados"
            value="0"
            icon={<Users className="h-5 w-5" />}
            trend="neutral"
            trendValue="Comece agora"
            variant="compact"
          />
        </div>
        
        <NativeMetricsCard
          title="Meta do Mês"
          value="0%"
          subtitle="Configure sua primeira meta"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="neutral"
          trendValue="Meta: R$ 2.000,00"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="px-4" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-100 mb-3">Primeiros Passos</h3>
        <div className="grid grid-cols-2 gap-3">
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1 transition-all duration-200 hover:scale-105"
            onClick={onNavigateToCommissions}
          >
            <Wallet className="h-5 w-5" />
            <span className="text-xs">Ver Comissões</span>
          </NativeButton>
          
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1 transition-all duration-200 hover:scale-105"
            onClick={onNavigateToReports}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Gerar Relatório</span>
          </NativeButton>
        </div>
      </motion.div>

      {/* Empty State for Activity */}
      <motion.div className="px-4" variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-100">Atividade Recente</h3>
        </div>
        
        <NativeEmptyState
          icon={<DollarSign className="h-8 w-8" />}
          title="Nenhuma atividade ainda"
          description="Suas vendas e leads aparecerão aqui quando você começar a trabalhar"
          actionLabel="Acessar Recursos"
          onAction={() => window.location.href = "/employee/dashboard?tab=resources"}
        />
      </motion.div>

      {/* CTA Section */}
      <motion.div className="px-4 pb-6" variants={itemVariants}>
        <NativeCard variant="glass" padding="lg" className="text-center">
          <motion.div 
            className="mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-16 w-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="h-8 w-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Comece sua jornada
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Acesse nossos recursos e materiais para começar a vender
            </p>
          </motion.div>
          
          <NativeButton 
            variant="primary" 
            fullWidth
            className="transition-all duration-200 hover:scale-105"
          >
            Explorar Recursos
          </NativeButton>
        </NativeCard>
      </motion.div>
    </motion.div>
  );
};

export default NativeMobileDashboard;
