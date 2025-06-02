
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

// Desktop components
import EmployeeSidebar from "@/components/EmployeeSidebar";
import DesktopDashboard from "@/components/dashboard/DesktopDashboard";

// Native Mobile components
import NativeMobileLayout from "@/components/mobile/NativeMobileLayout";
import NativeMobileDashboard from "@/components/mobile/dashboard/NativeMobileDashboard";
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

  const refreshData = async () => {
    setIsRefreshing(true);
    toast.info("Verificando novos dados...");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
    toast.success("Dados atualizados!");
  };

  // Handle tab change with smooth transition
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/employee/dashboard?tab=${value}`, { replace: true });
  };

  // Page transition variants for tab content only
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Mobile render based on active tab with transitions only for tab content
  const renderMobileContent = () => {
    return (
      <motion.div
        key={activeTab}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {activeTab === "resources" && <MobileResourcesView />}
        {activeTab === "commissions" && <MobileCommissionsView />}
        {(!activeTab || activeTab === "metrics") && (
          <NativeMobileDashboard
            isRefreshing={isRefreshing}
            onRefresh={refreshData}
            onNavigateToCommissions={() => handleTabChange("commissions")}
            onNavigateToReports={() => navigate("/employee/reports")}
          />
        )}
      </motion.div>
    );
  };

  // Get page title and subtitle based on active tab
  const getPageInfo = () => {
    switch (activeTab) {
      case "resources":
        return { title: "Recursos", subtitle: "Materiais para vendas" };
      case "commissions":
        return { title: "Comissões", subtitle: "Acompanhe seus ganhos" };
      default:
        return { title: "Dashboard", subtitle: "Visão geral do desempenho" };
    }
  };

  // Mobile Layout
  if (isMobile) {
    const { title, subtitle } = getPageInfo();
    
    return (
      <NativeMobileLayout 
        title={title}
        subtitle={subtitle}
      >
        {renderMobileContent()}
      </NativeMobileLayout>
    );
  }

  // Desktop Layout with transitions
  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <motion.main 
        className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.main>
    </div>
  );
};

export default Dashboard;
