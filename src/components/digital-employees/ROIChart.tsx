
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
    <section className="py-8 md:py-16 bg-gradient-to-br from-black/20 to-gold/5">
      <div className="container mx-auto px-3 md:px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-gold flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight">
              ROI Real dos Nossos Clientes
            </h2>
          </div>
          <p className="text-lg md:text-xl text-foreground/80 mb-2 px-2">
            Veja como o investimento se transforma em economia exponencial
          </p>
          <p className="text-gold font-medium text-sm md:text-base px-2">
            Baseado na média de empresas com faturamento de R$ 500k+ mensais
          </p>
        </div>

        <Card className="p-4 md:p-8 border-gold/20 bg-black/30 backdrop-blur-lg">
          <div className="h-64 md:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
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
                  fontSize={10}
                  className="md:text-xs"
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#ffffff60"
                  fontSize={10}
                  className="md:text-xs"
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#FFD700"
                  strokeWidth={2}
                  dot={{ fill: "#FFD700", strokeWidth: 1, r: 4 }}
                  activeDot={{ r: 6, stroke: "#FFD700", strokeWidth: 2, fill: "#ffffff" }}
                  animationDuration={2000}
                  animationBegin={0}
                  className="md:stroke-[3px]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gold/20">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gold mb-1 md:mb-2">720%</div>
              <div className="text-foreground/70 text-sm md:text-base">ROI em 12 meses</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gold mb-1 md:mb-2">R$ 820k</div>
              <div className="text-foreground/70 text-sm md:text-base">Economia anual média</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gold-light mb-1 md:mb-2">3-4 meses</div>
              <div className="text-foreground/70 text-sm md:text-base">Payback médio</div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6 md:mt-8">
          <div className="inline-flex flex-col md:flex-row items-center gap-2 bg-gold/10 px-4 md:px-6 py-3 rounded-full">
            <Calculator className="h-4 w-4 md:h-5 md:w-5 text-gold flex-shrink-0" />
            <span className="text-gold font-medium text-sm md:text-base text-center leading-tight">
              Quer calcular o ROI específico da sua empresa? Agende uma reunião executiva
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIChart;
