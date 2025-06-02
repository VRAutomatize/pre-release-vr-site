
import React from "react";
import { NativeCard } from "@/components/ui/native-card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface NativeActivityCardProps {
  title: string;
  description?: string;
  status: string;
  statusColor?: "success" | "warning" | "error" | "info" | "neutral";
  timestamp?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  showArrow?: boolean;
}

const NativeActivityCard = ({
  title,
  description,
  status,
  statusColor = "neutral",
  timestamp,
  icon,
  onClick,
  showArrow = true
}: NativeActivityCardProps) => {
  const getStatusColor = () => {
    switch (statusColor) {
      case "success": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "warning": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "error": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "info": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <NativeCard 
      variant="default"
      padding="md"
      interactive={!!onClick}
      className={cn(
        "transition-all duration-200",
        onClick && "cursor-pointer hover:bg-gray-800/80"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className="flex-shrink-0 text-yellow-400 p-2 bg-yellow-400/10 rounded-lg">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-100 truncate">
                {title}
              </h4>
              {description && (
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border",
              getStatusColor()
            )}>
              {status}
            </div>
            
            {timestamp && (
              <span className="text-xs text-gray-500">
                {timestamp}
              </span>
            )}
          </div>
        </div>
        
        {showArrow && onClick && (
          <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
        )}
      </div>
    </NativeCard>
  );
};

export default NativeActivityCard;
