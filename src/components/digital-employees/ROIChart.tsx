
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, Calculator } from "lucide-react";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";

const ROIChart = () => {
  const { trackEvent } = useConversionAnalytics();
  const [animationComplete, setAnimationComplete] = useState(false);

  const roiData = [
    { month: "Mês 1", roi: -15, investment: 100, savings: 85 },
    { month: "Mês 2", roi: 45, investment: 100, savings: 145 },
    { month: "Mês 3", roi: 120, investment: 100, savings: 220 },
    { month: "Mês 4", roi: 185, investment: 100, savings: 285 },
    { month: "Mês 5", roi: 250, investment: 100, savings: 350 },
    { month: "Mês 6", roi: 320, investment: 100, savings: 420 },
    { month: "Mês 7", roi: 380, investment: 100, savings: 480 },
    { month: "Mês 8", roi: 450, investment: 100, savings: 550 },
    { month: "Mês 9", roi: 510, investment: 100, savings: 610 },
    { month: "Mês 10", roi: 580, investment: 100, savings: 680 },
    { month: "Mês 11", roi: 640, investment: 100, savings: 740 },
    { month: "Mês 12", roi: 720, investment: 100, savings: 820 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      trackEvent('roi_chart_viewed', 'view', 'roi_chart', 'roi_section', {
        chartType: 'animated_line_chart',
        finalROI: '720%'
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [trackEvent]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-lg border border-gold/20 rounded-lg p-3 shadow-lg">
          <p className="text-gold font-medium">{label}</p>
          <p className="text-gold">
            ROI: <span className="font-bold">{payload[0].value}%</span>
          </p>
          <p className="text-foreground/70 text-sm">
            Economia: R$ {payload[0].payload.savings.toLocaleString()}k
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-black/20 to-gold/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-gold" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              ROI Real dos Nossos Clientes
            </h2>
          </div>
          <p className="text-xl text-foreground/80 mb-2">
            Veja como o investimento se transforma em economia exponencial
          </p>
          <p className="text-gold font-medium">
            Baseado na média de empresas com faturamento de R$ 500k+ mensais
          </p>
        </div>

        <Card className="p-8 border-gold/20 bg-black/30 backdrop-blur-lg">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis 
                  dataKey="month" 
                  stroke="#ffffff60"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#ffffff60"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#FFD700"
                  strokeWidth={3}
                  dot={{ fill: "#FFD700", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#FFD700", strokeWidth: 2, fill: "#ffffff" }}
                  animationDuration={2000}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gold/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-2">720%</div>
              <div className="text-foreground/70">ROI em 12 meses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-2">R$ 820k</div>
              <div className="text-foreground/70">Economia anual média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-light mb-2">3-4 meses</div>
              <div className="text-foreground/70">Payback médio</div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 px-6 py-3 rounded-full">
            <Calculator className="h-5 w-5 text-gold" />
            <span className="text-gold font-medium">
              Quer calcular o ROI específico da sua empresa? Agende uma reunião executiva
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIChart;
