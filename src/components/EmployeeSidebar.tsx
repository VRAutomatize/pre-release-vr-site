
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active,
  collapsed,
  isHovered
}: { 
  icon: React.ElementType; 
  label: string; 
  href: string; 
  active: boolean;
  collapsed: boolean;
  isHovered: boolean;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-gold/10 relative group",
        active ? "bg-gold/10 text-gold" : "text-foreground",
        collapsed ? "justify-center" : ""
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {(!collapsed || isHovered) && (
        <span className={cn(
          "transition-opacity whitespace-nowrap", 
          isHovered && collapsed ? "opacity-100" : "",
          collapsed && !isHovered ? "opacity-0" : "opacity-100"
        )}>
          {label}
        </span>
      )}
      {collapsed && !isHovered && (
        <div className="absolute left-full z-50 ml-1 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left">
          <div className="bg-background/80 backdrop-blur-lg border border-gold/20 rounded-md py-1 px-2 shadow-lg">
            <span className="whitespace-nowrap">{label}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

const EmployeeSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  
  // Always collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);
  
  const sidebarWidth = collapsed && !hovered ? "w-16" : "w-64";
  const isExpanded = !collapsed || hovered;

  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r border-gold/20 bg-background/40 backdrop-blur-md transition-all duration-300 z-10 overflow-hidden",
        sidebarWidth
      )}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <div className={cn(
        "flex h-14 items-center border-b border-gold/20 px-4 transition-all duration-300",
        collapsed && !hovered ? "justify-center" : "justify-between"
      )}>
        {(!collapsed || hovered) ? (
          <>
            <h2 className={cn(
              "text-lg font-semibold text-gold whitespace-nowrap transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0"
            )}>
              VR Link
            </h2>
            {!isMobile && (
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="text-gold hover:bg-gold/10 p-1 rounded-full"
              >
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  collapsed ? "" : "rotate-180"
                )} />
              </button>
            )}
          </>
        ) : (
          <h2 className="text-lg font-semibold text-gold">VR</h2>
        )}
      </div>
      <div className="flex-1 py-4 px-2 overflow-y-auto overflow-x-hidden">
        <nav className="flex flex-col gap-2 min-w-0 w-full">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/dashboard"
            active={currentPath === "/dashboard"}
            collapsed={collapsed}
            isHovered={hovered}
          />
          <SidebarItem
            icon={FileText}
            label="Gerar Relatório"
            href="/dashboard/reports"
            active={currentPath === "/dashboard/reports"}
            collapsed={collapsed}
            isHovered={hovered}
          />
          <SidebarItem
            icon={Users}
            label="Devs"
            href="/dashboard/devs"
            active={currentPath === "/dashboard/devs"}
            collapsed={collapsed}
            isHovered={hovered}
          />
        </nav>
      </div>
      <div className="border-t border-gold/20 p-2">
        <button
          onClick={() => logout()}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors",
            collapsed && !hovered ? "justify-center" : ""
          )}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {(!collapsed || hovered) && <span className={cn(
            "transition-opacity duration-300 whitespace-nowrap",
            isExpanded ? "opacity-100" : "opacity-0"
          )}>Sair</span>}
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
