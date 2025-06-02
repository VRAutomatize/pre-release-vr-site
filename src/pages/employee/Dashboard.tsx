
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useIsMobile";

// Desktop components
import EmployeeSidebar from "@/components/EmployeeSidebar";
import DesktopDashboard from "@/components/dashboard/DesktopDashboard";

// Mobile components
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileDashboardOverview from "@/components/mobile/dashboard/MobileDashboardOverview";
import MobileResourcesView from "@/components/mobile/dashboard/MobileResourcesView";
import MobileCommissionsView from "@/components/mobile/dashboard/MobileCommissionsView";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
    navigate(`/employee/dashboard?tab=${value}`, { replace: true });
  };

  // Mobile render based on active tab
  const renderMobileContent = () => {
    if (activeTab === "resources") {
      return <MobileResourcesView />;
    } else if (activeTab === "commissions") {
      return <MobileCommissionsView />;
    }
    return (
      <MobileDashboardOverview
        isRefreshing={isRefreshing}
        onRefresh={refreshData}
        onNavigateToCommissions={() => handleTabChange("commissions")}
        onNavigateToReports={() => navigate("/employee/reports")}
      />
    );
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <MobileLayout 
        title={
          activeTab === "resources" ? "Recursos" :
          activeTab === "commissions" ? "Comissões" :
          "Dashboard"
        }
      >
        {renderMobileContent()}
      </MobileLayout>
    );
  }

  // Desktop Layout
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

        <DesktopDashboard
          activeTab={activeTab}
          isRefreshing={isRefreshing}
          onTabChange={handleTabChange}
          onRefresh={refreshData}
        />
      </main>
    </div>
  );
};

export default Dashboard;
