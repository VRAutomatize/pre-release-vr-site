
import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Target, DollarSign, Activity } from "lucide-react";

interface MetricsProps {
  conversions: {
    total: number;
    rate: number;
    trend: number;
  };
  traffic: {
    visitors: number;
    trend: number;
  };
  revenue: {
    projected: number;
    trend: number;
  };
}

export const DashboardMetrics = ({ conversions, traffic, revenue }: MetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="premium-glass border-gold/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/70">Taxa de Conversão</p>
            <p className="text-2xl font-bold text-gold">
              {conversions.rate}%
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">
                +{conversions.trend}%
              </span>
            </div>
          </div>
          <Target className="h-8 w-8 text-gold" />
        </div>
      </Card>

      <Card className="premium-glass border-gold/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/70">Conversões Totais</p>
            <p className="text-2xl font-bold text-green-400">
              {conversions.total}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">
                +{Math.round(conversions.trend * 0.8)}%
              </span>
            </div>
          </div>
          <Users className="h-8 w-8 text-green-400" />
        </div>
      </Card>

      <Card className="premium-glass border-gold/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/70">Visitantes</p>
            <p className="text-2xl font-bold text-blue-400">
              {traffic.visitors.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400">
                +{traffic.trend}%
              </span>
            </div>
          </div>
          <Activity className="h-8 w-8 text-blue-400" />
        </div>
      </Card>

      <Card className="premium-glass border-gold/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/70">Receita Projetada</p>
            <p className="text-2xl font-bold text-purple-400">
              R$ {(revenue.projected / 1000000).toFixed(1)}M
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400">
                +{revenue.trend}%
              </span>
            </div>
          </div>
          <DollarSign className="h-8 w-8 text-purple-400" />
        </div>
      </Card>
    </div>
  );
};
