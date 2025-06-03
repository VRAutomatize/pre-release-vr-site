
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Clock, Zap } from "lucide-react";

interface Metric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ComponentType<any>;
  color: string;
}

// Componente de contador ultra-otimizado
const OptimizedCounter = React.memo(({ 
  value, 
  prefix = "", 
  suffix = "",
  className = ""
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  const formatValue = (val: number) => {
    if (prefix === "R$ " && val >= 1000000) {
      return (val / 1000000).toFixed(1) + "M";
    }
    return Math.floor(val).toString();
  };

  return (
    <span className={className}>
      {prefix}{formatValue(value)}{suffix}
    </span>
  );
});

const OptimizedRealTimeMetrics = React.memo(() => {
  const [metrics] = useState<Metric[]>(() => [
    {
      id: "companies",
      label: "Empresas Atendidas",
      value: 247,
      suffix: "+",
      icon: Users,
      color: "text-blue-400"
    },
    {
      id: "savings",
      label: "Economia Total Gerada",
      value: 8750000,
      prefix: "R$ ",
      suffix: "",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      id: "automation",
      label: "Processos Automatizados",
      value: 1580,
      suffix: "",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      id: "response_time",
      label: "Tempo Médio de Resposta",
      value: 23,
      suffix: "s",
      icon: Clock,
      color: "text-purple-400"
    },
    {
      id: "roi",
      label: "ROI Médio dos Clientes",
      value: 385,
      suffix: "%",
      icon: TrendingUp,
      color: "text-gold"
    }
  ]);

  // Memoizar cards para evitar re-renders
  const memoizedCards = useMemo(() => {
    return metrics.map((metric, index) => {
      const IconComponent = metric.icon;
      
      return (
        <Card key={metric.id} className="premium-glass border-gold/20 text-center p-4">
          <IconComponent className={`h-6 w-6 ${metric.color} mx-auto mb-3`} />
          <div className="mb-2">
            <OptimizedCounter
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              className={`text-xl font-bold ${metric.color}`}
            />
          </div>
          <p className="text-xs text-foreground/70">
            {metric.label}
          </p>
        </Card>
      );
    });
  }, [metrics]);

  return (
    <section className="py-6 bg-black/5">
      <div className="container-premium">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Métricas em Tempo Real
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Atualizando em tempo real</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {memoizedCards}
        </div>
      </div>
    </section>
  );
});

export default OptimizedRealTimeMetrics;
