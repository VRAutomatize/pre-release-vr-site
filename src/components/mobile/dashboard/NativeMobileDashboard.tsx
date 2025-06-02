
import React, { useState } from "react";
import { RefreshCw, BarChart, Users, DollarSign, Wallet, TrendingUp, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NativeButton } from "@/components/ui/native-button";
import { NativeCard } from "@/components/ui/native-card";
import NativeMetricsCard from "@/components/mobile/NativeMetricsCard";
import NativeActivityCard from "@/components/mobile/NativeActivityCard";

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

  return (
    <div className="w-full space-y-6">
      {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/5" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400 mb-1">
                Olá, {user?.name?.split(' ')[0] || "Colaborador"}! 👋
              </h1>
              <p className="text-sm text-gray-400">
                Aqui está um resumo dos seus dados de hoje
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
      </div>

      {/* Key Metrics Grid */}
      <div className="px-4 space-y-4">
        <NativeMetricsCard
          title="Comissões Disponíveis"
          value="R$ 2.450,00"
          subtitle="Pronto para solicitação"
          icon={<Wallet className="h-6 w-6" />}
          trend="up"
          trendValue="+15%"
          variant="featured"
          className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/20"
        />
        
        <div className="grid grid-cols-2 gap-3">
          <NativeMetricsCard
            title="Vendas do Mês"
            value="R$ 8.200,00"
            icon={<BarChart className="h-5 w-5" />}
            trend="up"
            trendValue="+12%"
            variant="compact"
          />
          <NativeMetricsCard
            title="Leads Captados"
            value="24"
            icon={<Users className="h-5 w-5" />}
            trend="up"
            trendValue="+8"
            variant="compact"
          />
        </div>
        
        <NativeMetricsCard
          title="Meta do Mês"
          value="78%"
          subtitle="R$ 15.600,00 de R$ 20.000,00"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="Meta: 85%"
        />
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-gray-100 mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1"
            onClick={onNavigateToCommissions}
          >
            <Wallet className="h-5 w-5" />
            <span className="text-xs">Solicitar Saque</span>
          </NativeButton>
          
          <NativeButton 
            variant="secondary" 
            className="h-14 flex-col gap-1"
            onClick={onNavigateToReports}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Ver Relatórios</span>
          </NativeButton>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-100">Atividade Recente</h3>
          <NativeButton variant="ghost" size="sm">
            Ver Todas
          </NativeButton>
        </div>
        
        <div className="space-y-3">
          <NativeActivityCard
            title="Nova venda confirmada"
            description="Cliente: Tech Solutions LTDA - Pacote Premium"
            status="Confirmado"
            statusColor="success"
            timestamp="Há 2 horas"
            icon={<DollarSign className="h-4 w-4" />}
            onClick={() => {}}
          />
          
          <NativeActivityCard
            title="Lead qualificado"
            description="Empresário interessado em automação completa"
            status="Qualificado"
            statusColor="info"
            timestamp="Há 4 horas"
            icon={<Users className="h-4 w-4" />}
            onClick={() => {}}
          />
          
          <NativeActivityCard
            title="Meta de vendas atualizada"
            description="Nova meta mensal definida pela equipe"
            status="Atualizado"
            statusColor="warning"
            timestamp="Ontem"
            icon={<TrendingUp className="h-4 w-4" />}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 pb-6">
        <NativeCard variant="glass" padding="lg" className="text-center">
          <div className="mb-4">
            <div className="h-16 w-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="h-8 w-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-100 mb-2">
              Pronto para mais vendas?
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Use nossos recursos para captar mais leads e fechar mais negócios
            </p>
          </div>
          
          <NativeButton variant="primary" fullWidth>
            Acessar Recursos
          </NativeButton>
        </NativeCard>
      </div>
    </div>
  );
};

export default NativeMobileDashboard;
