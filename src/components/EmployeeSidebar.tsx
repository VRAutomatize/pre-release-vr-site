
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active 
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string; 
  active: boolean;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-gold/10",
        active ? "bg-gold/10 text-gold" : "text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const EmployeeSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gold/20 bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center border-b border-gold/20 px-4">
        <h2 className="text-lg font-semibold text-gold">VR Link</h2>
      </div>
      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/dashboard"
            active={currentPath === "/dashboard"}
          />
          <SidebarItem
            icon={FileText}
            label="Gerar Relatório"
            href="/dashboard/reports"
            active={currentPath === "/dashboard/reports"}
          />
          <SidebarItem
            icon={Users}
            label="Devs"
            href="/dashboard/devs"
            active={currentPath === "/dashboard/devs"}
          />
        </nav>
      </div>
      <div className="border-t border-gold/20 p-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
