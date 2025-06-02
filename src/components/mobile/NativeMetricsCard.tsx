
import React from "react";
import { NativeCard } from "@/components/ui/native-card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NativeMetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  variant?: "default" | "featured" | "compact";
  animated?: boolean;
}

const NativeMetricsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend = "neutral",
  trendValue,
  className,
  variant = "default",
  animated = true
}: NativeMetricsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-400";
      case "down": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4" />;
      case "down": return <TrendingDown className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const variants = {
    default: "p-4",
    featured: "p-6 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-yellow-400/20",
    compact: "p-3"
  };

  return (
    <NativeCard 
      variant="elevated"
      padding="none"
      interactive
      className={cn(
        "overflow-hidden",
        variants[variant],
        animated && "transform transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-400 mb-1 truncate">
            {title}
          </p>
          <div className={cn(
            "font-bold text-yellow-400 mb-1",
            variant === "featured" ? "text-3xl" : "text-2xl"
          )}>
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 truncate">
              {subtitle}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 ml-3">
            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400">
              {icon}
            </div>
          </div>
        )}
      </div>

      {trendValue && (
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            getTrendColor(),
            trend === "up" && "bg-green-400/10",
            trend === "down" && "bg-red-400/10",
            trend === "neutral" && "bg-gray-400/10"
          )}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
          
          {variant === "featured" && (
            <div className="h-8 w-16 bg-gradient-to-r from-yellow-400/20 to-transparent rounded opacity-50" />
          )}
        </div>
      )}
    </NativeCard>
  );
};

export default NativeMetricsCard;
