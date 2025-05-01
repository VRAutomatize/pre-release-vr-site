
import React, { useState } from "react";
import { RefreshCw, BarChart, Users, Calendar, DollarSign } from "lucide-react";
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
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gold">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Bem-vindo, {user?.name || "Colaborador"}. Aqui estão seus dados atualizados.
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            className="border-gold/20 text-gold hover:bg-gold/10 w-full md:w-auto"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Atualizar Dados
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-6">
          <MetricsCard
            title="Total de Vendas"
            value="R$ 7.950,00"
            description="Mês atual"
            icon={<BarChart className="h-4 w-4" />}
          />
          <MetricsCard
            title="Leads Captados"
            value="28"
            description="Últimos 30 dias"
            icon={<Users className="h-4 w-4" />}
          />
          <MetricsCard
            title="Taxa de Conversão"
            value="14,3%"
            description="Leads → Vendas"
            icon={<Calendar className="h-4 w-4" />}
          />
          <MetricsCard
            title="Comissões"
            value="R$ 1.850,75"
            description="Disponível para solicitação"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        {/* Sales and Leads History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
