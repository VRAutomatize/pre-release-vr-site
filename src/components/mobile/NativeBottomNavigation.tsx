
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Play,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

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
        "flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 native-touch native-press min-h-[48px] relative group",
        active 
          ? "bg-yellow-400/20 text-yellow-400 transform scale-105" 
          : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 hover:scale-105"
      )}
    >
      <div className="relative transition-transform duration-200 group-active:scale-95">
        <Icon className="h-5 w-5 mb-1 transition-all duration-200" />
      </div>
      <span className="text-[10px] font-medium leading-none transition-all duration-200">
        {label}
      </span>
      
      {/* Active indicator with animation */}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-yellow-400 rounded-full animate-scale-in" />
      )}
    </Link>
  );
};

const NativeBottomNavigation = () => {
  const location = useLocation();
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
      icon: Play,
      label: "Recursos",
      href: "/employee/dashboard?tab=resources",
      active: currentPath === "/employee/dashboard" && currentTab === "resources"
    },
    {
      icon: FileText,
      label: "Relatórios",
      href: "/employee/reports", 
      active: currentPath === "/employee/reports"
    },
    {
      icon: Users,
      label: "Devs",
      href: "/employee/devs",
      active: currentPath === "/employee/devs"
    }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-yellow-400/10 transition-all duration-300"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between px-2 py-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NativeBottomNavigation;
