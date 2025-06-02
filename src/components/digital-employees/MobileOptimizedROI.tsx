
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

const MobileOptimizedROI = () => {
  const isMobile = useIsMobile();
  const [currentView, setCurrentView] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const views = [
    { title: "Gráfico ROI", data: roiData },
    { title: "Principais Métricas", data: null },
    { title: "Economia Mensal", data: null }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentView < views.length - 1) {
      setCurrentView(currentView + 1);
    }
    if (isRightSwipe && currentView > 0) {
      setCurrentView(currentView - 1);
    }
  };

  if (!isMobile) return null;

  return (
    <section className="py-8 px-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-gold" />
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            ROI Real dos Nossos Clientes
          </h2>
        </div>
        <p className="text-sm text-gold/80 mb-2">
          Veja como o investimento se transforma em economia exponencial
        </p>
      </div>

      {/* Swipeable Content */}
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentView * 100}%)` }}
        >
          {/* Chart View */}
          <div className="w-full flex-shrink-0">
            <Card className="p-4 border-gold/20 bg-black/30 backdrop-blur-lg">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roiData} margin={{ top: 10, right: 15, left: 10, bottom: 10 }}>
                    <XAxis 
                      dataKey="month" 
                      stroke="#ffffff60"
                      fontSize={10}
                      interval={2}
                    />
                    <YAxis 
                      stroke="#ffffff60"
                      fontSize={10}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="roi"
                      stroke="#FFD700"
                      strokeWidth={3}
                      dot={{ fill: "#FFD700", strokeWidth: 1, r: 3 }}
                      activeDot={{ r: 5, stroke: "#FFD700", strokeWidth: 2, fill: "#ffffff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Metrics View */}
          <div className="w-full flex-shrink-0 px-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4 text-center border-gold/20 bg-black/30">
                <div className="text-2xl font-bold text-gold mb-1">720%</div>
                <div className="text-sm text-gold/80">ROI em 12 meses</div>
              </Card>
              <Card className="p-4 text-center border-gold/20 bg-black/30">
                <div className="text-2xl font-bold text-gold mb-1">R$ 820k</div>
                <div className="text-sm text-gold/80">Economia anual média</div>
              </Card>
              <Card className="p-4 text-center border-gold/20 bg-black/30">
                <div className="text-2xl font-bold text-gold-light mb-1">3-4 meses</div>
                <div className="text-sm text-gold/80">Payback médio</div>
              </Card>
            </div>
          </div>

          {/* Monthly Savings View */}
          <div className="w-full flex-shrink-0 px-4">
            <Card className="p-4 border-gold/20 bg-black/30">
              <h3 className="text-lg font-semibold text-gold mb-4 text-center">Economia Progressiva</h3>
              <div className="space-y-3">
                {[
                  { month: "Mês 1-3", saving: "Implementação", color: "text-blue-400" },
                  { month: "Mês 4-6", saving: "R$ 50k+", color: "text-green-400" },
                  { month: "Mês 7-9", saving: "R$ 120k+", color: "text-yellow-400" },
                  { month: "Mês 10-12", saving: "R$ 200k+", color: "text-gold" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                    <span className="text-sm font-medium text-gold/90">{item.month}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.saving}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentView(Math.max(0, currentView - 1))}
          className="p-2 rounded-full bg-gold/20 text-gold disabled:opacity-50"
          disabled={currentView === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex gap-2">
          {views.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentView(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentView === index ? 'bg-gold w-6' : 'bg-gold/30'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setCurrentView(Math.min(views.length - 1, currentView + 1))}
          className="p-2 rounded-full bg-gold/20 text-gold disabled:opacity-50"
          disabled={currentView === views.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-6">
        <div className="inline-flex flex-col items-center gap-1 bg-gold/10 px-4 py-3 rounded-full">
          <Calculator className="h-4 w-4 text-gold" />
          <span className="text-gold font-medium text-xs text-center">
            Calcule o ROI da sua empresa
          </span>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedROI;
