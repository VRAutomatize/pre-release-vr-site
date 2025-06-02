
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MobileHistoryCardProps {
  title: string;
  subtitle?: string;
  status: string;
  statusColor?: "success" | "warning" | "error" | "info";
  timestamp?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const MobileHistoryCard = ({
  title,
  subtitle,
  status,
  statusColor = "info",
  timestamp,
  icon,
  onClick
}: MobileHistoryCardProps) => {
  const getStatusColor = () => {
    switch (statusColor) {
      case "success": return "text-green-400 bg-green-400/10";
      case "warning": return "text-yellow-400 bg-yellow-400/10";
      case "error": return "text-red-400 bg-red-400/10";
      default: return "text-blue-400 bg-blue-400/10";
    }
  };

  return (
    <Card 
      className={cn(
        "glass-blur border-gold/10 shadow-sm",
        onClick && "cursor-pointer hover:bg-gold/5 transition-colors"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {icon && (
                <div className="text-gold flex-shrink-0">
                  {icon}
                </div>
              )}
              <h4 className="text-sm font-medium text-gold truncate">{title}</h4>
            </div>
            
            {subtitle && (
              <p className="text-xs text-gold/60 mb-2 leading-tight">{subtitle}</p>
            )}
            
            {timestamp && (
              <p className="text-xs text-gold/50">{timestamp}</p>
            )}
          </div>
          
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2",
            getStatusColor()
          )}>
            {status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileHistoryCard;
