
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
import { motion } from "framer-motion";
import InteractionFeedback from "@/components/animations/InteractionFeedback";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <Link to={href} className="flex-1">
      <InteractionFeedback type="tap">
        <div
          className={cn(
            "flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 min-h-[48px] relative group",
            active 
              ? "bg-yellow-400/20 text-yellow-400" 
              : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
          )}
        >
          {/* Icon with bounce animation when active */}
          <motion.div 
            className="relative transition-transform duration-200"
            animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Icon className="h-5 w-5 mb-1 transition-all duration-200" />
          </motion.div>
          
          {/* Label with smooth color transition */}
          <motion.span 
            className="text-[10px] font-medium leading-none transition-all duration-200"
            animate={{ 
              color: active ? "rgb(250, 204, 21)" : "rgb(156, 163, 175)" 
            }}
          >
            {label}
          </motion.span>
          
          {/* Active indicator with scale animation */}
          {active && (
            <motion.div 
              className="absolute bottom-0 left-1/2 w-6 h-1 bg-yellow-400 rounded-full"
              initial={{ scale: 0, x: "-50%" }}
              animate={{ scale: 1, x: "-50%" }}
              transition={{ 
                duration: 0.3, 
                ease: [0.68, -0.55, 0.265, 1.55] 
              }}
            />
          )}
          
          {/* Glow effect for active state */}
          {active && (
            <motion.div
              className="absolute inset-0 bg-yellow-400/10 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </InteractionFeedback>
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
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-yellow-400/10 transition-all duration-300"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2 
      }}
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      
      <div className="flex items-center justify-between px-2 py-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
          >
            <NavItem {...item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NativeBottomNavigation;
