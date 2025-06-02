
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  BookOpen,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-200 min-h-[44px]",
        active 
          ? "bg-gold/20 text-gold" 
          : "text-muted-foreground hover:text-gold hover:bg-gold/10"
      )}
    >
      <Icon className="h-5 w-5 mb-0.5" />
      <span className="text-xs font-medium leading-none">{label}</span>
    </Link>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab");

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/employee/dashboard",
      active: currentPath === "/employee/dashboard" && (!currentTab || currentTab === "metrics")
    },
    {
      icon: CreditCard,
      label: "Pagamentos",
      href: "/employee/links",
      active: currentPath === "/employee/links"
    },
    {
      icon: FileText,
      label: "Relatórios",
      href: "/employee/reports", 
      active: currentPath === "/employee/reports"
    },
    {
      icon: BookOpen,
      label: "Recursos",
      href: "/employee/dashboard?tab=resources",
      active: currentTab === "resources"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-lg border-t border-gold/10 safe-area-pb">
      <div className="grid grid-cols-5 gap-0.5 px-2 py-1">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
        <button
          onClick={() => logout()}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-200 text-red-500 hover:bg-red-500/10 min-h-[44px]"
        >
          <LogOut className="h-5 w-5 mb-0.5" />
          <span className="text-xs font-medium leading-none">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
