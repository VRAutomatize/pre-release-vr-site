
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface MobileHistoryCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  status?: string;
  date?: string;
  statusColor?: "default" | "success" | "warning" | "error";
  onClick?: () => void;
}

const MobileHistoryCard = ({
  title,
  subtitle,
  value,
  status,
  date,
  statusColor = "default",
  onClick
}: MobileHistoryCardProps) => {
  const getStatusColor = () => {
    switch (statusColor) {
      case "success": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "warning": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "error": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gold/10 text-gold border-gold/20";
    }
  };

  return (
    <Card 
      className="glass-blur border-gold/20 mb-3 cursor-pointer hover:bg-background/50 transition-all duration-200"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {/* Título principal */}
            <h3 className="font-medium text-foreground truncate mb-1">
              {title}
            </h3>
            
            {/* Subtítulo */}
            {subtitle && (
              <p className="text-sm text-muted-foreground truncate mb-2">
                {subtitle}
              </p>
            )}
            
            {/* Footer com data e valor */}
            <div className="flex items-center gap-3">
              {date && (
                <span className="text-xs text-gold/70">{date}</span>
              )}
              {value && (
                <span className="text-sm font-medium text-gold">
                  {value}
                </span>
              )}
            </div>
          </div>
          
          {/* Status e seta */}
          <div className="flex items-center gap-2 ml-3">
            {status && (
              <Badge className={getStatusColor()}>
                {status}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileHistoryCard;
