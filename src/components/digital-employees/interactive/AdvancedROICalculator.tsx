
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEnhancedConversionAnalytics } from "@/hooks/useEnhancedConversionAnalytics";

interface ROIResult {
  monthlySavings: number;
  yearlyROI: number;
  paybackMonths: number;
  currentCosts: number;
  projectedCosts: number;
}

const AdvancedROICalculator = () => {
  const { trackEvent } = useEnhancedConversionAnalytics();
  const [employees, setEmployees] = useState([12]);
  const [avgSalary, setAvgSalary] = useState([4500]);
  const [processes, setProcesses] = useState([8]);
  const [results, setResults] = useState<ROIResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const employeeCount = employees[0];
    const salary = avgSalary[0];
    const processCount = processes[0];
    
    // Custos atuais (funcionários + encargos)
    const currentMonthlyCost = employeeCount * salary * 1.8; // 80% encargos
    const currentYearlyCost = currentMonthlyCost * 12;
    
    // Custos projetados com automação (redução de 60-80%)
    const automationCost = 15000; // Custo inicial da automação
    const maintenanceCost = 2000; // Custo mensal de manutenção
    const projectedMonthlyCost = maintenanceCost + (currentMonthlyCost * 0.25); // 75% redução
    const projectedYearlyCost = projectedMonthlyCost * 12 + automationCost;
    
    const monthlySavings = currentMonthlyCost - projectedMonthlyCost;
    const yearlySavings = currentYearlyCost - projectedYearlyCost;
    const yearlyROI = (yearlySavings / automationCost) * 100;
    const paybackMonths = automationCost / monthlySavings;
    
    const result: ROIResult = {
      monthlySavings,
      yearlyROI,
      paybackMonths,
      currentCosts: currentMonthlyCost,
      projectedCosts: projectedMonthlyCost
    };
    
    setResults(result);
    setShowResults(true);
    
    trackEvent('roi_calculator_calculated', 'calculate', 'roi_calculator', 'interactive', {
      employees: employeeCount,
      avgSalary: salary,
      processes: processCount,
      monthlySavings: monthlySavings,
      yearlyROI: yearlyROI
    });
  };

  useEffect(() => {
    trackEvent('roi_calculator_viewed', 'view', 'roi_calculator', 'interactive');
  }, [trackEvent]);

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-background via-background/95 to-gold/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-6 w-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              Calculadora de ROI Personalizada
            </h2>
          </div>
          <p className="text-foreground/80 text-lg">
            Descubra quanto sua empresa pode economizar com Funcionários Digitais
          </p>
        </motion.div>

        <Card className="p-6 md:p-8 bg-background/80 backdrop-blur-lg border-gold/20">
          <div className="space-y-8">
            {/* Input Controls */}
            <div className="grid gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gold" />
                  <label className="text-lg font-medium">
                    Funcionários Operacionais: <span className="text-gold font-bold">{employees[0]}</span>
                  </label>
                </div>
                <Slider
                  value={employees}
                  onValueChange={setEmployees}
                  max={50}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-foreground/60">
                  <span>3 funcionários</span>
                  <span>50+ funcionários</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gold" />
                  <label className="text-lg font-medium">
                    Salário Médio: <span className="text-gold font-bold">R$ {avgSalary[0].toLocaleString()}</span>
                  </label>
                </div>
                <Slider
                  value={avgSalary}
                  onValueChange={setAvgSalary}
                  max={15000}
                  min={1500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-foreground/60">
                  <span>R$ 1.500</span>
                  <span>R$ 15.000+</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <label className="text-lg font-medium">
                    Processos Repetitivos: <span className="text-gold font-bold">{processes[0]}</span>
                  </label>
                </div>
                <Slider
                  value={processes}
                  onValueChange={setProcesses}
                  max={20}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-foreground/60">
                  <span>2 processos</span>
                  <span>20+ processos</span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <motion.button
              onClick={calculateROI}
              className="w-full bg-gold hover:bg-gold-light text-background font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator className="h-5 w-5" />
                Calcular Minha Economia
              </div>
            </motion.button>

            {/* Results */}
            {showResults && results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4 md:gap-6 mt-8 p-6 bg-gold/10 rounded-lg border border-gold/20"
              >
                <h3 className="text-xl font-bold text-gold text-center mb-4">
                  Seus Resultados Personalizados
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      R$ {results.monthlySavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-foreground/70">Economia Mensal</div>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-gold mb-1">
                      {results.yearlyROI.toFixed(0)}%
                    </div>
                    <div className="text-sm text-foreground/70">ROI Anual</div>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {results.paybackMonths.toFixed(1)} meses
                    </div>
                    <div className="text-sm text-foreground/70">Payback</div>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {((results.currentCosts - results.projectedCosts) / results.currentCosts * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-foreground/70">Redução de Custos</div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <motion.button
                    onClick={() => trackEvent('roi_calculator_cta_clicked', 'click', 'schedule_meeting', 'interactive')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Quero Implementar Esta Economia 🚀
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedROICalculator;
