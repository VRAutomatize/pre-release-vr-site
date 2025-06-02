
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebounce } from "@/hooks/useDebounce";

// Memoizar o componente para evitar re-renders desnecessários
const InteractiveROICalculator = React.memo(() => {
  const isMobile = useIsMobile();
  const [employees, setEmployees] = useState(5);
  const [avgSalary, setAvgSalary] = useState(3500);
  
  // Debounce dos valores para evitar cálculos excessivos
  const debouncedEmployees = useDebounce(employees, 300);
  const debouncedSalary = useDebounce(avgSalary, 300);

  // Memoizar cálculos pesados
  const calculatedSavings = useMemo(() => {
    const monthlyCost = debouncedEmployees * (debouncedSalary + debouncedSalary * 0.8);
    const systemCost = 2500;
    const monthlySavings = monthlyCost * 0.7 - systemCost;
    const yearlySavings = monthlySavings * 12;
    const roi = ((yearlySavings - systemCost * 12) / (systemCost * 12)) * 100;

    return {
      monthly: Math.max(0, monthlySavings),
      yearly: Math.max(0, yearlySavings),
      roi: Math.max(0, roi)
    };
  }, [debouncedEmployees, debouncedSalary]);

  // Callbacks otimizados
  const handleCalculate = useCallback(() => {
    document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleGetConsultation = useCallback(() => {
    const message = `Olá! Calculei uma economia potencial de R$ ${calculatedSavings.monthly.toLocaleString()}/mês com Funcionários Digitais. Quero saber mais!`;
    window.open(`https://wa.me/554788558257?text=${encodeURIComponent(message)}`, '_blank');
  }, [calculatedSavings.monthly]);

  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-gradient-to-b from-card/20 to-transparent">
      <div className="container mx-auto px-4">
        
        {/* Section Header - Simplificado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/15 px-4 py-2 rounded-full mb-6">
            <Calculator className="h-5 w-5 text-gold" />
            <span className="text-gold font-semibold">Calculadora de Economia</span>
          </div>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4`}>
            <span className="text-white">Descubra Sua</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-gold">
              Economia Potencial
            </span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80 max-w-2xl mx-auto`}>
            Veja quanto sua empresa pode economizar substituindo processos manuais por sistemas automatizados
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-gold/20 rounded-2xl">
            
            {/* Calculator Inputs - Otimizados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Number of Employees */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <Users className="inline h-5 w-5 mr-2 text-gold" />
                  Funcionários em Processos Operacionais
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>1</span>
                    <span className="text-gold font-bold text-xl">{employees} funcionários</span>
                    <span>50+</span>
                  </div>
                </div>
              </div>

              {/* Average Salary */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <DollarSign className="inline h-5 w-5 mr-2 text-gold" />
                  Salário Médio (R$)
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1500"
                    max="15000"
                    step="500"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>R$ 1.5k</span>
                    <span className="text-gold font-bold text-xl">R$ {avgSalary.toLocaleString()}</span>
                    <span>R$ 15k+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display - Otimizado */}
            <div id="calculator-results" className="space-y-6">
              
              {/* Monthly and Yearly Savings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-400/15 border border-green-400/30 rounded-xl p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">Economia Mensal</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-400">
                    R$ {calculatedSavings.monthly.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-gold/15 border border-gold/30 rounded-xl p-6 text-center">
                  <DollarSign className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">Economia Anual</p>
                  <p className="text-2xl md:text-3xl font-bold text-gold">
                    R$ {calculatedSavings.yearly.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-blue-400/15 border border-blue-400/30 rounded-xl p-6 text-center">
                  <Calculator className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">ROI Projetado</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-400">
                    {calculatedSavings.roi.toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-card/40 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Detalhamento da Economia:</h3>
                <div className="space-y-3 text-foreground/80">
                  <div className="flex justify-between items-center">
                    <span>• Custo atual com {debouncedEmployees} funcionários/mês:</span>
                    <span className="font-semibold text-red-400">
                      R$ {(debouncedEmployees * (debouncedSalary + debouncedSalary * 0.8)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• Custo do sistema automatizado/mês:</span>
                    <span className="font-semibold text-gold">R$ 2.500</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gold/20 pt-3">
                    <span className="font-semibold">• Economia líquida mensal:</span>
                    <span className="font-bold text-green-400 text-lg">
                      R$ {calculatedSavings.monthly.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center space-y-4">
                <Button
                  onClick={handleGetConsultation}
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Quero Esta Economia Agora!
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                
                <p className="text-sm text-foreground/70">
                  ✓ Análise personalizada gratuita • ✓ Sem compromisso • ✓ Resultados em 48h
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style>
        {`
          .slider-optimized::-webkit-slider-thumb {
            appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #FFD700;
            cursor: pointer;
            border: 2px solid #1e232a;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            will-change: transform;
          }
          
          .slider-optimized::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #FFD700;
            cursor: pointer;
            border: 2px solid #1e232a;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            will-change: transform;
          }
          
          .slider-optimized {
            will-change: auto;
          }
        `}
      </style>
    </section>
  );
});

InteractiveROICalculator.displayName = "InteractiveROICalculator";

export default InteractiveROICalculator;
