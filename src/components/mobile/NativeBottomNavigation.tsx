
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
  badge?: number;
  featured?: boolean;
}

const NavItem = ({ icon: Icon, label, href, active, badge, featured }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 native-touch native-press min-h-[56px] relative",
        featured 
          ? "bg-yellow-400/20 text-yellow-400 scale-110" 
          : active 
            ? "bg-yellow-400/20 text-yellow-400" 
            : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
      )}
    >
      <div className="relative">
        <Icon className={cn("mb-1", featured ? "h-7 w-7" : "h-6 w-6")} />
        {badge && badge > 0 && (
          <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {badge > 9 ? "9+" : badge}
            </span>
          </div>
        )}
      </div>
      <span className={cn("font-medium leading-none", featured ? "text-xs font-semibold" : "text-xs")}>
        {label}
      </span>
      
      {/* Active indicator */}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full" />
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
      active: currentPath === "/employee/dashboard" && (!currentTab || currentTab === "metrics"),
      badge: 0
    },
    {
      icon: CreditCard,
      label: "Pagamentos",
      href: "/employee/links",
      active: currentPath === "/employee/links",
      badge: 0
    },
    {
      icon: Play,
      label: "Recursos",
      href: "/employee/dashboard?tab=resources",
      active: currentTab === "resources",
      badge: 2,
      featured: true
    },
    {
      icon: FileText,
      label: "Relatórios",
      href: "/employee/reports", 
      active: currentPath === "/employee/reports",
      badge: 0
    },
    {
      icon: Users,
      label: "Devs",
      href: "/employee/devs",
      active: currentPath === "/employee/devs",
      badge: 0
    }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-yellow-400/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NativeBottomNavigation;
