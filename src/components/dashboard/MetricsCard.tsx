
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const MetricsCard = ({
  title,
  value,
  description,
  icon,
  className,
}: MetricsCardProps) => {
  return (
    <Card className={`glass-card card-hover ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-gold p-2 bg-gold/10 rounded-full">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-xl md:text-2xl font-bold text-gold">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
