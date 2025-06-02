
import React from "react";
import { BarChart, Users, Calendar, DollarSign, Wallet, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import MetricsCard from "@/components/dashboard/MetricsCard";
import SalesHistory from "@/components/dashboard/SalesHistory";
import LeadsHistory from "@/components/dashboard/LeadsHistory";
import CommissionsPanel from "@/components/dashboard/CommissionsPanel";
import ResourcesPanel from "@/components/dashboard/ResourcesPanel";

interface DesktopDashboardProps {
  activeTab: string;
  isRefreshing: boolean;
  onTabChange: (value: string) => void;
  onRefresh: () => void;
}

const DesktopDashboard = ({
  activeTab,
  isRefreshing,
  onTabChange,
  onRefresh
}: DesktopDashboardProps) => {
  const { user } = useAuth();

  const renderTabContent = () => {
    if (activeTab === "resources") {
      return (
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gold">Recursos</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Acesse materiais e ferramentas para auxiliar nas suas vendas.
              </p>
            </div>
          </div>
          
          <ResourcesPanel />
        </div>
      );
    }
    
    return (
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gold">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Bem-vindo, {user?.name || "Colaborador"}. Aqui estão seus dados atualizados.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Tabs 
              value={activeTab} 
              onValueChange={onTabChange} 
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-2 w-full bg-background/40 backdrop-blur-md border border-gold/20">
                <TabsTrigger 
                  value="metrics" 
                  className="flex items-center gap-2 data-[state=active]:bg-gold/20 data-[state=active]:text-gold transition-all duration-300"
                >
                  <BarChart className="h-4 w-4" />
                  <span className="hidden md:inline">Métricas</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="flex items-center gap-2 data-[state=active]:bg-gold/20 data-[state=active]:text-gold transition-all duration-300"
                >
                  <Wallet className="h-4 w-4" />
                  <span className="hidden md:inline">Comissões</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              type="button"
              onClick={onRefresh} 
              variant="outline" 
              className="border-gold/20 text-gold hover:bg-gold/10"
              disabled={isRefreshing}
              size="icon"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsContent value="metrics" className="mt-0 space-y-6">
            {/* Metrics Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <MetricsCard
                title="Total de Vendas"
                value="R$ 0,00"
                description="Mês atual"
                icon={<BarChart className="h-4 w-4" />}
              />
              <MetricsCard
                title="Leads Captados"
                value="0"
                description="Últimos 30 dias"
                icon={<Users className="h-4 w-4" />}
              />
              <MetricsCard
                title="Taxa de Conversão"
                value="0,0%"
                description="Leads → Vendas"
                icon={<Calendar className="h-4 w-4" />}
              />
              <MetricsCard
                title="Comissões"
                value="R$ 0,00"
                description="Disponível para solicitação"
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            {/* Sales and Leads History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesHistory />
              <LeadsHistory />
            </div>
          </TabsContent>
          
          <TabsContent value="commissions" className="mt-0">
            <CommissionsPanel />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return renderTabContent();
};

export default DesktopDashboard;
