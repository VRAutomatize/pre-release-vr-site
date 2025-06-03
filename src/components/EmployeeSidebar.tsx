
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut,
  BookOpen,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active,
  onClick
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string; 
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center justify-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-gold/10 relative group",
        active ? "bg-gold/10 text-gold" : "text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="absolute left-full z-50 ml-1 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left">
        <div className="bg-background/80 backdrop-blur-lg border border-gold/20 rounded-md py-1 px-2 shadow-lg">
          <span className="whitespace-nowrap">{label}</span>
        </div>
      </div>
    </Link>
  );
};

const EmployeeSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab");

  return (
    <div 
      className="flex h-screen flex-col border-r border-gold/20 bg-background/40 backdrop-blur-md transition-all duration-300 z-10 overflow-hidden w-16"
    >
      <div className="flex h-14 items-center border-b border-gold/20 px-1 justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
          alt="VR Link Logo" 
          className="h-20 w-20 object-contain scale-150"
        />
      </div>
      <div className="flex-1 py-4 px-2 overflow-y-auto overflow-x-hidden">
        <nav className="flex flex-col gap-2 min-w-0 w-full">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/employee/dashboard"
            active={currentPath === "/employee/dashboard" && !currentTab || currentTab === "metrics"}
          />
          <SidebarItem
            icon={FileText}
            label="Gerar Relatório"
            href="/employee/reports"
            active={currentPath === "/employee/reports"}
          />
          <SidebarItem
            icon={BookOpen}
            label="Recursos"
            href="/employee/dashboard?tab=resources"
            active={currentTab === "resources"}
          />
          <SidebarItem
            icon={CreditCard}
            label="Links Pagamento"
            href="/employee/links"
            active={currentPath === "/employee/links"}
          />
          <SidebarItem
            icon={Users}
            label="Devs"
            href="/employee/devs"
            active={currentPath === "/employee/devs"}
          />
        </nav>
      </div>
      <div className="border-t border-gold/20 p-2">
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} className="flex-shrink-0" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
