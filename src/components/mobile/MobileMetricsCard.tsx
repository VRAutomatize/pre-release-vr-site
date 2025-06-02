
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MobileMetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const MobileMetricsCard = ({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue,
  className,
}: MobileMetricsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-400";
      case "down": return "text-red-400";
      default: return "text-gold/70";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4" />;
      case "down": return <TrendingDown className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className={`glass-blur border-gold/20 card-hover shadow-md ${className}`}>
      <CardContent className="p-4">
        {/* Header com ícone e título */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gold/80 mb-1">{title}</p>
            <div className="text-2xl font-bold text-gold mb-1">{value}</div>
          </div>
          {icon && (
            <div className="text-gold p-2 bg-gold/10 rounded-lg shadow-inner">
              {icon}
            </div>
          )}
        </div>

        {/* Footer com descrição e trend */}
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-gold/70 flex-1">{description}</p>
          )}
          
          {trendValue && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileMetricsCard;
