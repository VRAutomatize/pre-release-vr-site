
import React from "react";
import { RefreshCw, BarChart, Users, Calendar, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import MobileMetricsCard from "@/components/mobile/MobileMetricsCard";
import MobileHistoryCard from "@/components/mobile/MobileHistoryCard";

interface MobileDashboardOverviewProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onNavigateToCommissions: () => void;
  onNavigateToReports: () => void;
}

const MobileDashboardOverview = ({ 
  isRefreshing, 
  onRefresh, 
  onNavigateToCommissions,
  onNavigateToReports 
}: MobileDashboardOverviewProps) => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="py-3 border-b border-gold/5">
        <div className="px-3">
          <h1 className="text-xl font-bold text-gold mb-1">
            Olá, {user?.name?.split(' ')[0] || "Colaborador"}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mb-3">
            Aqui está um resumo dos seus dados
          </p>

          {/* Quick Refresh */}
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm"
            className="border-gold/20 text-gold hover:bg-gold/10 w-full"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Atualizando..." : "Atualizar Dados"}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="py-3 border-b border-gold/5">
        <div className="px-1 space-y-2">
          <MobileMetricsCard
            title="Total de Vendas"
            value="R$ 0,00"
            description="Mês atual"
            icon={<BarChart className="h-5 w-5" />}
            trend="neutral"
            layout="horizontal"
          />
          <MobileMetricsCard
            title="Leads Captados" 
            value="0"
            description="Últimos 30 dias"
            icon={<Users className="h-5 w-5" />}
            trend="neutral"
            layout="horizontal"
          />
          <MobileMetricsCard
            title="Taxa de Conversão"
            value="0,0%"
            description="Leads → Vendas"
            icon={<Calendar className="h-5 w-5" />}
            trend="neutral"
            layout="horizontal"
          />
          <MobileMetricsCard
            title="Comissões Disponíveis"
            value="R$ 0,00"
            description="Pronto para solicitação"
            icon={<DollarSign className="h-5 w-5" />}
            trend="neutral"
            layout="vertical"
            className="bg-gold/5"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-3 border-b border-gold/5">
        <div className="px-3">
          <h3 className="text-sm font-medium text-gold mb-2">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="border-gold/20 text-gold hover:bg-gold/10 h-12 text-sm"
              onClick={onNavigateToCommissions}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Comissões
            </Button>
            <Button 
              variant="outline" 
              className="border-gold/20 text-gold hover:bg-gold/10 h-12 text-sm"
              onClick={onNavigateToReports}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="py-3">
        <div className="px-3">
          <h3 className="text-sm font-medium text-gold mb-2">Atividade Recente</h3>
          <div className="space-y-1">
            <MobileHistoryCard
              title="Nenhuma venda registrada"
              subtitle="Suas vendas aparecerão aqui"
              status="Aguardando"
              statusColor="warning"
            />
            <MobileHistoryCard
              title="Nenhum lead captado"
              subtitle="Seus leads aparecerão aqui"
              status="Aguardando"
              statusColor="warning"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboardOverview;
