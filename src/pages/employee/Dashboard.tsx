
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw, BarChart, Users, Calendar, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import MetricsCard from "@/components/dashboard/MetricsCard";
import SalesHistory from "@/components/dashboard/SalesHistory";
import LeadsHistory from "@/components/dashboard/LeadsHistory";
import CommissionsPanel from "@/components/dashboard/CommissionsPanel";
import ResourcesPanel from "@/components/dashboard/ResourcesPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get tab from URL query parameter or default to "metrics"
  const getTabFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "metrics";
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromURL());
  
  // Update URL when tab changes
  useEffect(() => {
    const currentTab = getTabFromURL();
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location.search]);

  const refreshData = () => {
    setIsRefreshing(true);
    toast.info("Atualizando dados do dashboard...");
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dados atualizados com sucesso!");
    }, 1500);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`, { replace: true });
  };

  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6 relative z-10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gold">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Bem-vindo, {user?.name || "Colaborador"}. Aqui estão seus dados atualizados.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Tabs 
              value={activeTab} 
              onValueChange={handleTabChange} 
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
              onClick={() => refreshData()} 
              variant="outline" 
              className="border-gold/20 text-gold hover:bg-gold/10"
              disabled={isRefreshing}
              size="icon"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full relative z-10">
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
            {/* Commissions Panel */}
            <CommissionsPanel />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            {/* Resources Panel */}
            <ResourcesPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
