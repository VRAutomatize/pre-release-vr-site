
import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import MetricsCard from "@/components/dashboard/MetricsCard";
import SalesHistory from "@/components/dashboard/SalesHistory";
import LeadsHistory from "@/components/dashboard/LeadsHistory";
import CommissionsPanel from "@/components/dashboard/CommissionsPanel";

const Dashboard = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    toast.info("Atualizando dados do dashboard...");
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dados atualizados com sucesso!");
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.name || "Colaborador"}. Aqui estão seus dados atualizados.
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            className="border-gold/20 text-gold"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Atualizar Dados
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricsCard
            title="Total de Vendas"
            value="R$ 7.950,00"
            description="Mês atual"
          />
          <MetricsCard
            title="Leads Captados"
            value="28"
            description="Últimos 30 dias"
          />
          <MetricsCard
            title="Taxa de Conversão"
            value="14,3%"
            description="Leads → Vendas"
          />
          <MetricsCard
            title="Comissões"
            value="R$ 1.850,75"
            description="Disponível para solicitação"
          />
        </div>

        {/* Sales and Leads History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SalesHistory />
          <LeadsHistory />
        </div>

        {/* Commissions Panel */}
        <CommissionsPanel />
      </main>
    </div>
  );
};

export default Dashboard;
