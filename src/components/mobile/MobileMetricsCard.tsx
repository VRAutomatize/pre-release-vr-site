
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
  layout?: "vertical" | "horizontal";
}

const MobileMetricsCard = ({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue,
  className,
  layout = "horizontal"
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
      case "up": return <TrendingUp className="h-3 w-3" />;
      case "down": return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  if (layout === "horizontal") {
    return (
      <Card className={`glass-blur border-gold/10 shadow-sm ${className}`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gold/70 mb-0.5 leading-tight">{title}</p>
              <div className="text-lg font-bold text-gold mb-0.5 leading-none">{value}</div>
              {description && (
                <p className="text-xs text-gold/60 leading-tight">{description}</p>
              )}
            </div>
            
            {/* Right Side - Icon + Trend */}
            <div className="flex items-center gap-2 ml-3">
              {trendValue && (
                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="text-xs font-medium">{trendValue}</span>
                </div>
              )}
              {icon && (
                <div className="text-gold p-2 bg-gold/10 rounded-lg shadow-inner flex-shrink-0">
                  {icon}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vertical layout for larger cards
  return (
    <Card className={`glass-blur border-gold/10 shadow-sm ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <p className="text-xs font-medium text-gold/70 leading-tight flex-1">{title}</p>
          {icon && (
            <div className="text-gold p-1.5 bg-gold/10 rounded-md shadow-inner flex-shrink-0 ml-2">
              {icon}
            </div>
          )}
        </div>
        
        <div className="text-xl font-bold text-gold mb-1 leading-none">{value}</div>
        
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-gold/60 leading-tight flex-1">{description}</p>
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
