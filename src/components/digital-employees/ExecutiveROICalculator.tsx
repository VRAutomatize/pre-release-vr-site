
import React, { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, Building, Users, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebounce } from "@/hooks/useDebounce";

const ExecutiveROICalculator = React.memo(() => {
  const isMobile = useIsMobile();
  const [annualRevenue, setAnnualRevenue] = useState(5000000); // R$ 5M inicial
  const [totalEmployees, setTotalEmployees] = useState(50);
  const [operationalEmployees, setOperationalEmployees] = useState(15);
  const [avgSalary, setAvgSalary] = useState(4500);
  
  // Debounce dos valores
  const debouncedRevenue = useDebounce(annualRevenue, 300);
  const debouncedTotal = useDebounce(totalEmployees, 300);
  const debouncedOperational = useDebounce(operationalEmployees, 300);
  const debouncedSalary = useDebounce(avgSalary, 300);

  // Cálculos executivos avançados
  const executiveCalculations = useMemo(() => {
    // Custos completos por funcionário (salário + encargos + benefícios + treinamento)
    const fullEmployeeCost = debouncedSalary * 2.2; // Fator real de custos trabalhistas
    const annualOperationalCost = debouncedOperational * fullEmployeeCost * 12;
    
    // Sistema premium baseado no porte da empresa
    const systemCostMonthly = Math.min(15000, Math.max(5000, debouncedRevenue * 0.0008)); // 0.08% da receita, min 5k, max 15k
    const systemCostAnnual = systemCostMonthly * 12;
    
    // Economia considerando automação de 70% dos processos
    const automationRate = 0.7;
    const automatedPositions = Math.floor(debouncedOperational * automationRate);
    const annualSavings = automatedPositions * fullEmployeeCost * 12;
    const netAnnualSavings = annualSavings - systemCostAnnual;
    
    // ROI e payback
    const roi = ((netAnnualSavings / systemCostAnnual) * 100);
    const paybackMonths = systemCostAnnual / (netAnnualSavings / 12);
    
    // Impacto na margem
    const marginImpact = (netAnnualSavings / debouncedRevenue) * 100;
    
    return {
      annualOperationalCost,
      systemCostMonthly,
      systemCostAnnual,
      automatedPositions,
      annualSavings,
      netAnnualSavings: Math.max(0, netAnnualSavings),
      roi: Math.max(0, roi),
      paybackMonths: Math.max(0, paybackMonths),
      marginImpact: Math.max(0, marginImpact)
    };
  }, [debouncedRevenue, debouncedOperational, debouncedSalary]);

  const handleExportAnalysis = useCallback(() => {
    const analysis = {
      empresa: "Sua Empresa",
      faturamento: debouncedRevenue,
      funcionarios: debouncedTotal,
      operacionais: debouncedOperational,
      economia: executiveCalculations.netAnnualSavings,
      roi: executiveCalculations.roi,
      payback: executiveCalculations.paybackMonths
    };
    
    const message = `Análise Executiva - Funcionários Digitais

📊 *DADOS DA EMPRESA*
• Faturamento Anual: R$ ${debouncedRevenue.toLocaleString()}
• Total de Funcionários: ${debouncedTotal}
• Funcionários Operacionais: ${debouncedOperational}

💰 *ECONOMIA PROJETADA*
• Economia Anual: R$ ${executiveCalculations.netAnnualSavings.toLocaleString()}
• ROI: ${executiveCalculations.roi.toFixed(0)}%
• Payback: ${executiveCalculations.paybackMonths.toFixed(1)} meses
• Impacto na Margem: +${executiveCalculations.marginImpact.toFixed(1)}%

🚀 Quero agendar consultoria executiva para validar esta análise!`;
    
    window.open(`https://wa.me/554788558257?text=${encodeURIComponent(message)}`, '_blank');
  }, [debouncedRevenue, debouncedTotal, debouncedOperational, executiveCalculations]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-card/5 to-transparent">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/15 px-4 py-2 rounded-full mb-6">
            <Calculator className="h-5 w-5 text-gold" />
            <span className="text-gold font-semibold">Análise Executiva</span>
          </div>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4`}>
            <span className="text-white">Calcule o</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-green-400">
              Impacto Financeiro Real
            </span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80 max-w-3xl mx-auto`}>
            Análise personalizada baseada no porte e complexidade da sua empresa
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-gold/20 rounded-2xl">
            
            {/* Executive Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              
              {/* Annual Revenue */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <Building className="inline h-5 w-5 mr-2 text-gold" />
                  Faturamento Anual (R$)
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="2000000"
                    max="50000000"
                    step="500000"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>R$ 2M</span>
                    <span className="text-gold font-bold text-xl">R$ {(annualRevenue / 1000000).toFixed(1)}M</span>
                    <span>R$ 50M+</span>
                  </div>
                </div>
              </div>

              {/* Total Employees */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <Users className="inline h-5 w-5 mr-2 text-gold" />
                  Total de Funcionários
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={totalEmployees}
                    onChange={(e) => setTotalEmployees(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>10</span>
                    <span className="text-gold font-bold text-xl">{totalEmployees} funcionários</span>
                    <span>500+</span>
                  </div>
                </div>
              </div>

              {/* Operational Employees */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <Users className="inline h-5 w-5 mr-2 text-gold" />
                  Funcionários em Processos Operacionais
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="5"
                    max={Math.min(100, totalEmployees)}
                    step="1"
                    value={operationalEmployees}
                    onChange={(e) => setOperationalEmployees(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>5</span>
                    <span className="text-gold font-bold text-xl">{operationalEmployees} funcionários</span>
                    <span>{Math.min(100, totalEmployees)}</span>
                  </div>
                </div>
              </div>

              {/* Average Salary */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4">
                  <DollarSign className="inline h-5 w-5 mr-2 text-gold" />
                  Salário Médio Operacional (R$)
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    step="500"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
                  />
                  <div className="flex justify-between text-sm text-foreground/70">
                    <span>R$ 2k</span>
                    <span className="text-gold font-bold text-xl">R$ {avgSalary.toLocaleString()}</span>
                    <span>R$ 15k+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Results */}
            <div className="space-y-8">
              
              {/* Main Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-green-400/15 border-green-400/30 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">Economia Anual Líquida</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-400">
                    R$ {executiveCalculations.netAnnualSavings.toLocaleString()}
                  </p>
                </Card>
                
                <Card className="p-6 bg-gold/15 border-gold/30 text-center">
                  <Calculator className="h-8 w-8 text-gold mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">ROI Primeiro Ano</p>
                  <p className="text-2xl md:text-3xl font-bold text-gold">
                    {executiveCalculations.roi.toFixed(0)}%
                  </p>
                </Card>
                
                <Card className="p-6 bg-blue-400/15 border-blue-400/30 text-center">
                  <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-foreground/70 mb-1">Payback</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-400">
                    {executiveCalculations.paybackMonths.toFixed(1)} meses
                  </p>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <Card className="p-6 bg-card/40">
                <h3 className="text-xl font-semibold text-white mb-4">Análise Detalhada:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground/80">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>• Custo operacional atual/ano:</span>
                      <span className="font-semibold text-red-400">
                        R$ {executiveCalculations.annualOperationalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Posições automatizáveis:</span>
                      <span className="font-semibold text-gold">
                        {executiveCalculations.automatedPositions} funcionários
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Sistema + suporte/ano:</span>
                      <span className="font-semibold text-blue-400">
                        R$ {executiveCalculations.systemCostAnnual.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>• Economia bruta/ano:</span>
                      <span className="font-semibold text-green-400">
                        R$ {executiveCalculations.annualSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Impacto na margem:</span>
                      <span className="font-semibold text-gold">
                        +{executiveCalculations.marginImpact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gold/20 pt-3">
                      <span className="font-semibold">• Economia líquida/ano:</span>
                      <span className="font-bold text-green-400 text-lg">
                        R$ {executiveCalculations.netAnnualSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Executive CTA */}
              <div className="text-center space-y-4">
                <Button
                  onClick={handleExportAnalysis}
                  className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-background font-bold text-lg px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <FileText className="mr-2 h-6 w-6" />
                  Enviar Análise Completa
                  <TrendingUp className="ml-2 h-6 w-6" />
                </Button>
                
                <p className="text-sm text-foreground/70">
                  ✓ Análise executiva personalizada • ✓ Validação com especialista • ✓ Proposta em 48h
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
          }
          
          .slider-optimized::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #FFD700;
            cursor: pointer;
            border: 2px solid #1e232a;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
        `}
      </style>
    </section>
  );
});

ExecutiveROICalculator.displayName = "ExecutiveROICalculator";

export default ExecutiveROICalculator;
