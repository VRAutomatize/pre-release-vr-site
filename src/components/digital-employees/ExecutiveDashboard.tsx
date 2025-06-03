
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign, 
  Clock,
  BarChart,
  PieChart,
  Activity,
  Funnel
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from "recharts";

interface DashboardMetrics {
  conversions: {
    total: number;
    rate: number;
    trend: number;
  };
  traffic: {
    visitors: number;
    sources: Record<string, number>;
    trend: number;
  };
  funnel: {
    awareness: number;
    interest: number;
    consideration: number;
    intent: number;
    purchase: number;
  };
  abTests: {
    testId: string;
    testName: string;
    variants: Array<{
      id: string;
      name: string;
      conversionRate: number;
      visitors: number;
    }>;
  }[];
  revenue: {
    projected: number;
    trend: number;
  };
}

const ExecutiveDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    conversions: { total: 247, rate: 8.4, trend: 12.3 },
    traffic: { 
      visitors: 3240, 
      trend: 15.7,
      sources: {
        'Organic': 45,
        'Google Ads': 30,
        'Social': 15,
        'Direct': 10
      }
    },
    funnel: {
      awareness: 100,
      interest: 67,
      consideration: 34,
      intent: 18,
      purchase: 8.4
    },
    abTests: [
      {
        testId: 'hero_headline',
        testName: 'Hero Headline Test',
        variants: [
          { id: 'control', name: 'Original', conversionRate: 7.2, visitors: 1620 },
          { id: 'variant_a', name: 'Results Focused', conversionRate: 9.6, visitors: 1620 }
        ]
      },
      {
        testId: 'cta_primary',
        testName: 'Primary CTA Test',
        variants: [
          { id: 'control', name: 'Original', conversionRate: 8.1, visitors: 1620 },
          { id: 'variant_a', name: 'Urgency', conversionRate: 8.7, visitors: 1620 }
        ]
      }
    ],
    revenue: { projected: 2450000, trend: 23.5 }
  });

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        conversions: {
          ...prev.conversions,
          total: prev.conversions.total + Math.floor(Math.random() * 3)
        },
        traffic: {
          ...prev.traffic,
          visitors: prev.traffic.visitors + Math.floor(Math.random() * 5)
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const conversionTrendData = [
    { date: '01/12', conversions: 45, rate: 7.2 },
    { date: '08/12', conversions: 52, rate: 7.8 },
    { date: '15/12', conversions: 48, rate: 7.5 },
    { date: '22/12', conversions: 61, rate: 8.4 },
    { date: '29/12', conversions: 58, rate: 8.1 },
    { date: '05/01', conversions: 67, rate: 8.7 },
    { date: 'Hoje', conversions: 72, rate: 9.2 }
  ];

  const funnelData = Object.entries(metrics.funnel).map(([stage, value]) => ({
    stage: stage.charAt(0).toUpperCase() + stage.slice(1),
    value,
    color: {
      awareness: '#3B82F6',
      interest: '#10B981',
      consideration: '#F59E0B',
      intent: '#EF4444',
      purchase: '#8B5CF6'
    }[stage] || '#6B7280'
  }));

  return (
    <div className="min-h-screen bg-black/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              Dashboard Executivo
            </h1>
            <p className="text-foreground/70 mt-1">
              Análise de Performance - Landing Page Funcionários Digitais
            </p>
          </div>
          
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "button-premium" : ""}
              >
                {range === '7d' ? '7 dias' : range === '30d' ? '30 dias' : '90 dias'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="premium-glass border-gold/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-gold">
                  {metrics.conversions.rate}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    +{metrics.conversions.trend}%
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
                  {metrics.conversions.total}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    +{Math.round(metrics.conversions.trend * 0.8)}%
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
                  {metrics.traffic.visitors.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-400">
                    +{metrics.traffic.trend}%
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
                  R$ {(metrics.revenue.projected / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-purple-400">
                    +{metrics.revenue.trend}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Trend */}
          <Card className="premium-glass border-gold/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Tendência de Conversões</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#D4AF37" 
                  strokeWidth={3}
                  dot={{ fill: '#D4AF37', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Funnel Analysis */}
          <Card className="premium-glass border-gold/20 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Funnel className="h-5 w-5" />
              Funil de Conversão
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={funnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                <YAxis dataKey="stage" type="category" width={100} stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #D4AF37',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Taxa']}
                />
                <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* A/B Tests Results */}
        <Card className="premium-glass border-gold/20 p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Resultados dos Testes A/B
          </h3>
          
          <div className="space-y-6">
            {metrics.abTests.map((test) => (
              <div key={test.testId} className="border border-gold/20 rounded-lg p-4">
                <h4 className="font-medium mb-4">{test.testName}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {test.variants.map((variant) => (
                    <div key={variant.id} className="bg-black/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{variant.name}</span>
                        <Badge 
                          variant={variant.conversionRate > 8 ? "default" : "secondary"}
                          className={variant.conversionRate > 8 ? "bg-green-500" : ""}
                        >
                          {variant.conversionRate}%
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/70">
                        {variant.visitors} visitantes
                      </p>
                      {test.variants.length === 2 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gold h-2 rounded-full" 
                              style={{ 
                                width: `${(variant.conversionRate / Math.max(...test.variants.map(v => v.conversionRate))) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="premium-glass border-gold/20 p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="button-premium">
              Exportar Relatório
            </Button>
            <Button variant="outline" className="border-gold/30">
              Configurar Alertas
            </Button>
            <Button variant="outline" className="border-gold/30">
              Ver Heatmaps
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
