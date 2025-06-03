
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Clock, Zap } from "lucide-react";
import { AnimatedCounter } from "./PremiumAnimations";

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

const RealTimeMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
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

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const randomChange = Math.random() * 0.02; // Small random change
        let newValue = metric.value;
        
        switch (metric.id) {
          case "companies":
            newValue = metric.value + (Math.random() > 0.9 ? 1 : 0);
            break;
          case "savings":
            newValue = metric.value + (Math.random() > 0.8 ? Math.floor(Math.random() * 10000) : 0);
            break;
          case "automation":
            newValue = metric.value + (Math.random() > 0.85 ? Math.floor(Math.random() * 3) : 0);
            break;
          case "response_time":
            newValue = Math.max(15, metric.value + (Math.random() > 0.5 ? -1 : 1));
            break;
          case "roi":
            newValue = metric.value + (Math.random() > 0.9 ? Math.floor(Math.random() * 5) : 0);
            break;
        }
        
        return { ...metric, value: newValue };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (metric: Metric) => {
    if (metric.id === "savings") {
      return (metric.value / 1000000).toFixed(1) + "M";
    }
    return metric.value.toString();
  };

  return (
    <section className="section-premium bg-black/10">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Métricas em Tempo Real
          </h2>
          <p className="text-xl text-foreground/80">
            Acompanhe o impacto dos nossos funcionários digitais
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Atualizando em tempo real</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="premium-glass border-gold/20 hover:border-gold/40 transition-all text-center p-6 relative overflow-hidden">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/5 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <IconComponent className={`h-8 w-8 ${metric.color} mx-auto mb-4`} />
                    
                    <div className="mb-2">
                      <AnimatedCounter
                        end={Number(formatValue(metric).replace(/[^0-9.]/g, ''))}
                        duration={2}
                        prefix={metric.prefix}
                        suffix={formatValue(metric).includes('M') ? 'M' + (metric.suffix || '') : metric.suffix}
                        className={`text-2xl md:text-3xl font-bold ${metric.color}`}
                      />
                    </div>
                    
                    <p className="text-sm text-foreground/70 mb-3">
                      {metric.label}
                    </p>
                    
                    {/* Change indicator */}
                    <div className={`flex items-center justify-center gap-1 text-xs ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${
                        metric.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      <span>
                        {metric.change > 0 ? '+' : ''}{metric.change}
                        {metric.id === 'savings' ? 'k' : metric.id === 'roi' ? '%' : ''}
                        {' esta semana'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Pulse animation for active metrics */}
                  <motion.div
                    className="absolute inset-0 border-2 border-gold/30 rounded-lg"
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold px-6 py-3 rounded-lg">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">
              Sua empresa pode ser a próxima a aparecer nessas métricas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTimeMetrics;
