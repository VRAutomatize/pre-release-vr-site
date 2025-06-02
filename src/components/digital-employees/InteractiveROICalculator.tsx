
import React, { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebounce } from "@/hooks/useDebounce";
import CalculatorInputs from "./calculator/CalculatorInputs";
import CalculatorResults from "./calculator/CalculatorResults";
import CalculatorBreakdown from "./calculator/CalculatorBreakdown";
import CalculatorCTA from "./calculator/CalculatorCTA";

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
  const handleGetConsultation = useCallback(() => {
    const message = `Olá! Calculei uma economia potencial de R$ ${calculatedSavings.monthly.toLocaleString()}/mês com Funcionários Digitais. Quero saber mais!`;
    window.open(`https://wa.me/554788558257?text=${encodeURIComponent(message)}`, '_blank');
  }, [calculatedSavings.monthly]);

  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-gradient-to-b from-card/20 to-transparent">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
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
            
            {/* Calculator Inputs */}
            <CalculatorInputs
              employees={employees}
              avgSalary={avgSalary}
              onEmployeesChange={setEmployees}
              onSalaryChange={setAvgSalary}
            />

            {/* Results Display */}
            <div id="calculator-results" className="space-y-6">
              <CalculatorResults calculatedSavings={calculatedSavings} />
              
              {/* Detailed Breakdown */}
              <CalculatorBreakdown
                debouncedEmployees={debouncedEmployees}
                debouncedSalary={debouncedSalary}
                calculatedSavings={calculatedSavings}
              />

              {/* Call to Action */}
              <CalculatorCTA onGetConsultation={handleGetConsultation} />
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
