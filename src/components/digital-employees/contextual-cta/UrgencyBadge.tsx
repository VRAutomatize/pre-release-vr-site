
import React from "react";
import { Clock } from "lucide-react";

interface UrgencyBadgeProps {
  urgency: "low" | "medium" | "high";
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency }) => {
  if (urgency !== "high") return null;

  return (
    <div className="flex items-center gap-2 text-red-400 text-sm">
      <Clock className="h-4 w-4" />
      <span className="font-medium">Oferta por tempo limitado</span>
    </div>
  );
};
