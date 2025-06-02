import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Building, Users, DollarSign, FileText, BarChart3, Download, Target, PieChart } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumInput, PremiumSection, PremiumMetricCard } from "./PremiumComponents";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from "recharts";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebounce } from "@/hooks/useDebounce";

interface CalculatorInputs {
  annualRevenue: number;
  totalEmployees: number;
  operationalEmployees: number;
  avgSalary: number;
  industry: string;
  currentAutomation: number;
}

interface ROIProjection {
  year: number;
  investment: number;
  savings: number;
  netReturn: number;
  cumulativeReturn: number;
}

interface SectorBenchmark {
  sector: string;
  avgROI: number;
  avgPayback: number;
  automationRate: number;
}

const ExecutiveROICalculatorAdvanced = React.memo(() => {
  const isMobile = useIsMobile();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    annualRevenue: 8000000,
    totalEmployees: 75,
    operationalEmployees: 25,
    avgSalary: 5500,
    industry: "manufacturing",
    currentAutomation: 15
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'projections' | 'benchmark'>('calculator');

  // Debounce inputs for performance
  const debouncedInputs = {
    annualRevenue: useDebounce(inputs.annualRevenue, 300),
    totalEmployees: useDebounce(inputs.totalEmployees, 300),
    operationalEmployees: useDebounce(inputs.operationalEmployees, 300),
    avgSalary: useDebounce(inputs.avgSalary, 300),
    industry: inputs.industry,
    currentAutomation: useDebounce(inputs.currentAutomation, 300)
  };

  const industries = [
    { value: "manufacturing", label: "Indústria/Manufatura", multiplier: 1.2 },
    { value: "retail", label: "Varejo/E-commerce", multiplier: 1.1 },
    { value: "finance", label: "Serviços Financeiros", multiplier: 1.3 },
    { value: "healthcare", label: "Saúde/Farmacêutica", multiplier: 1.15 },
    { value: "logistics", label: "Logística/Distribuição", multiplier: 1.25 },
    { value: "services", label: "Serviços Empresariais", multiplier: 1.0 }
  ];

  const sectorBenchmarks: SectorBenchmark[] = [
    { sector: "Indústria", avgROI: 420, avgPayback: 6.2, automationRate: 65 },
    { sector: "Varejo", avgROI: 380, avgPayback: 7.1, automationRate: 55 },
    { sector: "Financeiro", avgROI: 520, avgPayback: 5.8, automationRate: 75 },
    { sector: "Saúde", avgROI: 350, avgPayback: 8.2, automationRate: 45 },
    { sector: "Logística", avgROI: 480, avgPayback: 5.5, automationRate: 70 },
    { sector: "Serviços", avgROI: 320, avgPayback: 9.1, automationRate: 50 }
  ];

  // Advanced calculations with industry factors
  const calculations = useMemo(() => {
    const industryData = industries.find(i => i.value === debouncedInputs.industry);
    const industryMultiplier = industryData?.multiplier || 1.0;
    
    // Full employee cost (salary + benefits + overhead)
    const fullEmployeeCost = debouncedInputs.avgSalary * 2.4; // More realistic factor
    const annualOperationalCost = debouncedInputs.operationalEmployees * fullEmployeeCost * 12;
    
    // Premium system pricing based on complexity
    const baseSystemCost = Math.min(18000, Math.max(6000, debouncedInputs.annualRevenue * 0.001));
    const systemCostMonthly = baseSystemCost * industryMultiplier;
    const systemCostAnnual = systemCostMonthly * 12;
    
    // Automation potential considering current automation level
    const automationPotential = Math.max(0.4, 0.8 - (debouncedInputs.currentAutomation / 100));
    const automatedPositions = Math.floor(debouncedInputs.operationalEmployees * automationPotential);
    const annualSavings = automatedPositions * fullEmployeeCost * 12;
    
    // Net calculations
    const netAnnualSavings = Math.max(0, annualSavings - systemCostAnnual);
    const roi = netAnnualSavings > 0 ? ((netAnnualSavings / systemCostAnnual) * 100) : 0;
    const paybackMonths = netAnnualSavings > 0 ? (systemCostAnnual / (netAnnualSavings / 12)) : 0;
    const marginImpact = (netAnnualSavings / debouncedInputs.annualRevenue) * 100;
    
    // Risk factors
    const implementationRisk = debouncedInputs.operationalEmployees > 50 ? 0.15 : 0.1;
    const conservativeROI = roi * (1 - implementationRisk);
    
    return {
      annualOperationalCost,
      systemCostMonthly,
      systemCostAnnual,
      automatedPositions,
      annualSavings,
      netAnnualSavings,
      roi,
      conservativeROI,
      paybackMonths,
      marginImpact,
      automationPotential: automationPotential * 100,
      industryMultiplier
    };
  }, [debouncedInputs]);

  // 5-year projections
  const projections = useMemo((): ROIProjection[] => {
    const years = Array.from({ length: 5 }, (_, i) => i + 1);
    let cumulativeReturn = 0;
    
    return years.map(year => {
      // Escalating benefits over time
      const yearlyMultiplier = 1 + (year - 1) * 0.15; // 15% improvement per year
      const investment = year === 1 ? calculations.systemCostAnnual : calculations.systemCostAnnual * 0.8; // Lower maintenance cost
      const savings = calculations.netAnnualSavings * yearlyMultiplier;
      const netReturn = savings - investment;
      cumulativeReturn += netReturn;
      
      return {
        year,
        investment,
        savings,
        netReturn,
        cumulativeReturn
      };
    });
  }, [calculations]);

  const handleInputChange = useCallback((field: keyof CalculatorInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleExportAnalysis = useCallback(() => {
    const analysis = {
      empresa: "Sua Empresa",
      setor: debouncedInputs.industry,
      faturamento: debouncedInputs.annualRevenue,
      funcionarios: debouncedInputs.totalEmployees,
      economia: calculations.netAnnualSavings,
      roi: calculations.roi,
      payback: calculations.paybackMonths,
      projecao5anos: projections[4].cumulativeReturn
    };
    
    const message = `📊 *ANÁLISE EXECUTIVA PREMIUM*

🏢 *DADOS DA EMPRESA*
• Setor: ${industries.find(i => i.value === debouncedInputs.industry)?.label}
• Faturamento: R$ ${debouncedInputs.annualRevenue.toLocaleString()}
• Funcionários: ${debouncedInputs.totalEmployees} (${debouncedInputs.operationalEmployees} operacionais)

💰 *PROJEÇÃO FINANCEIRA*
• Economia Anual: R$ ${calculations.netAnnualSavings.toLocaleString()}
• ROI Primeiro Ano: ${calculations.roi.toFixed(0)}%
• Payback: ${calculations.paybackMonths.toFixed(1)} meses
• Retorno 5 Anos: R$ ${projections[4].cumulativeReturn.toLocaleString()}

📈 *ANÁLISE EXECUTIVA*
• Posições Automatizáveis: ${calculations.automatedPositions}
• Potencial de Automação: ${calculations.automationPotential.toFixed(0)}%
• Impacto na Margem: +${calculations.marginImpact.toFixed(1)}%

🎯 Quero validar esta análise com consultor C-level!`;
    
    window.open(`https://wa.me/554788558257?text=${encodeURIComponent(message)}`, '_blank');
  }, [debouncedInputs, calculations, projections, industries]);

  // Chart data
  const distributionData = [
    { name: 'Economia', value: calculations.netAnnualSavings, color: '#10B981' },
    { name: 'Investimento', value: calculations.systemCostAnnual, color: '#FFD700' },
    { name: 'ROI', value: calculations.netAnnualSavings - calculations.systemCostAnnual, color: '#3B82F6' }
  ];

  return (
    <PremiumSection className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Calculator className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Calculadora Executiva Avançada</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">Análise Financeira</span>{" "}
            <span className="executive-accent">Completa</span>
          </h2>
          <p className="executive-body-large max-w-3xl mx-auto">
            Projeções precisas com benchmarks setoriais e análise de risco
          </p>
        </div>

        {/* Premium Tabs */}
        <div className="flex justify-center mb-8">
          <div className="premium-card-glass p-2 inline-flex rounded-2xl">
            {[
              { id: 'calculator', label: 'Calculadora', icon: Calculator },
              { id: 'projections', label: 'Projeções', icon: TrendingUp },
              { id: 'benchmark', label: 'Benchmark', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'premium-button-primary text-background'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {!isMobile && tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Executive Inputs */}
            <PremiumCard className="p-8">
              <h3 className="executive-display-medium mb-8 text-center">Dados da Empresa</h3>
              
              <div className="premium-grid-2 gap-8">
                {/* Annual Revenue */}
                <div>
                  <label className="executive-body-medium font-semibold text-white mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-premium-gold" />
                    Faturamento Anual
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="2000000"
                      max="100000000"
                      step="1000000"
                      value={inputs.annualRevenue}
                      onChange={(e) => handleInputChange('annualRevenue', Number(e.target.value))}
                      className="premium-slider w-full"
                    />
                    <div className="text-center">
                      <span className="executive-accent text-2xl font-bold">
                        R$ {(inputs.annualRevenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Industry Selection */}
                <div>
                  <label className="executive-body-medium font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-premium-gold" />
                    Setor de Atuação
                  </label>
                  <select
                    value={inputs.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="premium-input w-full"
                  >
                    {industries.map(industry => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Operational Employees */}
                <div>
                  <label className="executive-body-medium font-semibold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-premium-gold" />
                    Funcionários Operacionais
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="5"
                      max="200"
                      value={inputs.operationalEmployees}
                      onChange={(e) => handleInputChange('operationalEmployees', Number(e.target.value))}
                      className="premium-slider w-full"
                    />
                    <div className="text-center">
                      <span className="executive-accent text-2xl font-bold">
                        {inputs.operationalEmployees} funcionários
                      </span>
                    </div>
                  </div>
                </div>

                {/* Average Salary */}
                <div>
                  <label className="executive-body-medium font-semibold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-premium-gold" />
                    Salário Médio Operacional
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="2000"
                      max="20000"
                      step="500"
                      value={inputs.avgSalary}
                      onChange={(e) => handleInputChange('avgSalary', Number(e.target.value))}
                      className="premium-slider w-full"
                    />
                    <div className="text-center">
                      <span className="executive-accent text-2xl font-bold">
                        R$ {inputs.avgSalary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Results Grid */}
            <div className="premium-grid-3 gap-6">
              <PremiumMetricCard
                icon={TrendingUp}
                value={`R$ ${calculations.netAnnualSavings.toLocaleString()}`}
                label="Economia Anual Líquida"
                highlight={true}
                description="Após descontar investimento"
              />
              <PremiumMetricCard
                icon={Target}
                value={`${calculations.roi.toFixed(0)}%`}
                label="ROI Primeiro Ano"
                description="Retorno sobre investimento"
              />
              <PremiumMetricCard
                icon={Building}
                value={`${calculations.paybackMonths.toFixed(1)}m`}
                label="Payback Period"
                description="Tempo de retorno"
              />
            </div>

            {/* Visual Analysis */}
            <PremiumCard className="p-8">
              <h3 className="executive-display-medium mb-6 text-center">Distribuição Financeira</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={distributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: R$ ${value.toLocaleString()}`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                      labelStyle={{ color: '#000' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </PremiumCard>
          </motion.div>
        )}

        {/* Projections Tab */}
        {activeTab === 'projections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <PremiumCard className="p-8">
              <h3 className="executive-display-medium mb-6 text-center">Projeção 5 Anos</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                      tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                      labelFormatter={(label) => `Ano ${label}`}
                      labelStyle={{ color: '#000' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeReturn" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Retorno Cumulativo"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#FFD700" 
                      strokeWidth={2}
                      name="Economia Anual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </PremiumCard>

            <div className="premium-grid-2 gap-6">
              <PremiumMetricCard
                icon={TrendingUp}
                value={`R$ ${projections[4].cumulativeReturn.toLocaleString()}`}
                label="Retorno Total 5 Anos"
                highlight={true}
              />
              <PremiumMetricCard
                icon={PieChart}
                value={`${((projections[4].cumulativeReturn / (calculations.systemCostAnnual * 5)) * 100).toFixed(0)}%`}
                label="ROI Acumulado 5 Anos"
                highlight={true}
              />
            </div>
          </motion.div>
        )}

        {/* Benchmark Tab */}
        {activeTab === 'benchmark' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <PremiumCard className="p-8">
              <h3 className="executive-display-medium mb-6 text-center">Benchmark Setorial</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorBenchmarks}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="sector" 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                      labelStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="avgROI" fill="#FFD700" name="ROI Médio %" />
                    <Bar dataKey="automationRate" fill="#10B981" name="Taxa Automação %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </PremiumCard>

            <div className="premium-grid-3 gap-6">
              {sectorBenchmarks.map((benchmark, index) => (
                <PremiumCard key={index} className="p-6 text-center">
                  <h4 className="executive-body-medium font-bold text-white mb-4">{benchmark.sector}</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="executive-body-small text-white/70">ROI Médio</span>
                      <div className="executive-accent text-xl font-bold">{benchmark.avgROI}%</div>
                    </div>
                    <div>
                      <span className="executive-body-small text-white/70">Payback</span>
                      <div className="text-white text-lg font-semibold">{benchmark.avgPayback}m</div>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Export CTA */}
        <div className="text-center mt-12">
          <PremiumButton
            onClick={handleExportAnalysis}
            className="premium-button-primary text-xl px-12 py-6"
          >
            <Download className="mr-3 h-6 w-6" />
            Exportar Análise Executiva Completa
            <FileText className="ml-3 h-6 w-6" />
          </PremiumButton>
          
          <p className="executive-body-small mt-4 text-white/70">
            ✓ Relatório PDF executivo • ✓ Análise setorial • ✓ Projeções 5 anos • ✓ Validação com especialista
          </p>
        </div>
      </div>

      <style>
        {`
          .premium-slider::-webkit-slider-thumb {
            appearance: none;
            height: 28px;
            width: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--premium-gold), var(--premium-gold-light));
            cursor: pointer;
            border: 3px solid #1e232a;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
            transition: all 0.2s ease;
          }
          
          .premium-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
          
          .premium-slider::-moz-range-thumb {
            height: 28px;
            width: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--premium-gold), var(--premium-gold-light));
            cursor: pointer;
            border: 3px solid #1e232a;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
          }
          
          .premium-slider::-webkit-slider-track {
            height: 8px;
            background: linear-gradient(90deg, #374151, var(--premium-gold));
            border-radius: 4px;
          }
        `}
      </style>
    </PremiumSection>
  );
});

ExecutiveROICalculatorAdvanced.displayName = "ExecutiveROICalculatorAdvanced";

export default ExecutiveROICalculatorAdvanced;
