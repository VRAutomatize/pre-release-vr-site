
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  change: number;
  trend: "up" | "down";
}

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
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const diff = value - displayValue;
    if (Math.abs(diff) > 0) {
      const increment = diff / 10;
      const timer = setInterval(() => {
        setDisplayValue(prev => {
          const next = prev + increment;
          if (Math.abs(value - next) < Math.abs(increment)) {
            clearInterval(timer);
            return value;
          }
          return next;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [value, displayValue]);

  const formatValue = (val: number) => {
    if (prefix === "R$ " && val >= 1000000) {
      return (val / 1000000).toFixed(1) + "M";
    }
    return Math.floor(val).toString();
  };

  return (
    <span className={className}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
});

const OptimizedRealTimeMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>(() => [
    {
      id: "companies",
      label: "Empresas Atendidas",
      value: 247,
      suffix: "+",
      icon: Users,
      color: "text-blue-400",
      change: 12,
      trend: "up"
    },
    {
      id: "savings",
      label: "Economia Total Gerada",
      value: 8750000,
      prefix: "R$ ",
      suffix: "",
      icon: DollarSign,
      color: "text-green-400",
      change: 450000,
      trend: "up"
    },
    {
      id: "automation",
      label: "Processos Automatizados",
      value: 1580,
      suffix: "",
      icon: Zap,
      color: "text-yellow-400",
      change: 45,
      trend: "up"
    },
    {
      id: "response_time",
      label: "Tempo Médio de Resposta",
      value: 23,
      suffix: "s",
      icon: Clock,
      color: "text-purple-400",
      change: -15,
      trend: "down"
    },
    {
      id: "roi",
      label: "ROI Médio dos Clientes",
      value: 385,
      suffix: "%",
      icon: TrendingUp,
      color: "text-gold",
      change: 25,
      trend: "up"
    }
  ]);

  // Debounced updates to reduce re-renders
  const updateMetrics = useCallback(() => {
    setMetrics(prev => prev.map(metric => {
      let newValue = metric.value;
      
      switch (metric.id) {
        case "companies":
          newValue = metric.value + (Math.random() > 0.95 ? 1 : 0);
          break;
        case "savings":
          newValue = metric.value + (Math.random() > 0.9 ? Math.floor(Math.random() * 5000) : 0);
          break;
        case "automation":
          newValue = metric.value + (Math.random() > 0.92 ? Math.floor(Math.random() * 2) : 0);
          break;
        case "response_time":
          newValue = Math.max(15, metric.value + (Math.random() > 0.7 ? (Math.random() > 0.5 ? -1 : 1) : 0));
          break;
        case "roi":
          newValue = metric.value + (Math.random() > 0.95 ? Math.floor(Math.random() * 3) : 0);
          break;
      }
      
      return { ...metric, value: newValue };
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 5000); // Increased interval
    return () => clearInterval(interval);
  }, [updateMetrics]);

  const memoizedCards = useMemo(() => {
    return metrics.map((metric, index) => {
      const IconComponent = metric.icon;
      
      return (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="premium-glass border-gold/20 hover:border-gold/40 transition-all text-center p-4 relative overflow-hidden">
            <div className="relative z-10">
              <IconComponent className={`h-6 w-6 ${metric.color} mx-auto mb-3`} />
              
              <div className="mb-2">
                <OptimizedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className={`text-xl font-bold ${metric.color}`}
                />
              </div>
              
              <p className="text-xs text-foreground/70 mb-2">
                {metric.label}
              </p>
              
              <div className={`flex items-center justify-center gap-1 text-xs ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`h-3 w-3 ${
                  metric.trend === 'down' ? 'rotate-180' : ''
                }`} />
                <span>
                  {metric.change > 0 ? '+' : ''}{metric.change}
                  {metric.id === 'savings' ? 'k' : metric.id === 'roi' ? '%' : ''}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      );
    });
  }, [metrics]);

  return (
    <section className="py-8 bg-black/5">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Métricas em Tempo Real
          </h2>
          <p className="text-lg text-foreground/80 mb-3">
            Acompanhe o impacto dos nossos funcionários digitais
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Atualizando em tempo real</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {memoizedCards}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold px-4 py-2 rounded-lg text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold">
              Sua empresa pode ser a próxima a aparecer nessas métricas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(OptimizedRealTimeMetrics);
