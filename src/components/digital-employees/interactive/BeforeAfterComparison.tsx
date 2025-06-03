
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Users, Clock, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEnhancedConversionAnalytics } from "@/hooks/useEnhancedConversionAnalytics";

const BeforeAfterComparison = () => {
  const { trackEvent } = useEnhancedConversionAnalytics();
  const [sliderValue, setSliderValue] = useState([50]);
  const [interacted, setInteracted] = useState(false);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (!interacted) {
      setInteracted(true);
      trackEvent('before_after_interacted', 'interact', 'comparison_slider', 'interactive');
    }
  };

  const slidePercentage = sliderValue[0];
  
  // Dados simulados baseados no slider
  const beforeData = {
    employees: 15,
    hourlyCost: 180,
    monthlyHours: 2400,
    monthlyCost: 43200,
    efficiency: 65,
    errors: 12
  };

  const afterData = {
    employees: 4,
    digitalEmployees: 8,
    hourlyCost: 45,
    monthlyHours: 2400,
    monthlyCost: 10800,
    efficiency: 95,
    errors: 1
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-background to-gold/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4">
            Antes vs Depois: Transformação Real
          </h2>
          <p className="text-foreground/80 text-lg mb-6">
            Deslize para ver a transformação da sua operação
          </p>
          
          {/* Interactive Slider */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Slider
                value={sliderValue}
                onValueChange={handleSliderChange}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-red-400 font-medium">ANTES</span>
                <span className="text-green-400 font-medium">DEPOIS</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              opacity: slidePercentage <= 50 ? 1 : 1 - (slidePercentage - 50) / 50
            }}
          >
            <Card className="p-6 bg-red-500/10 border-red-500/20 h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-400 mb-2">ANTES - Operação Tradicional</h3>
                  <p className="text-foreground/70">Alto custo, baixa eficiência</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <Users className="h-5 w-5 text-red-400" />
                    <div>
                      <div className="font-medium">{beforeData.employees} Funcionários</div>
                      <div className="text-sm text-foreground/60">Equipe operacional completa</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-red-400" />
                    <div>
                      <div className="font-medium">R$ {beforeData.monthlyCost.toLocaleString()}/mês</div>
                      <div className="text-sm text-foreground/60">Custo total operacional</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                    <div>
                      <div className="font-medium">{beforeData.efficiency}% Eficiência</div>
                      <div className="text-sm text-foreground/60">Produtividade média</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <Clock className="h-5 w-5 text-red-400" />
                    <div>
                      <div className="font-medium">{beforeData.errors} erros/mês</div>
                      <div className="text-sm text-foreground/60">Falhas humanas</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-red-500/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">R$ 518k</div>
                    <div className="text-sm text-foreground/60">Custo anual</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Arrow */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-gold p-3 rounded-full shadow-lg"
            >
              <ArrowRight className="h-6 w-6 text-background" />
            </motion.div>
          </div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              opacity: slidePercentage >= 50 ? 1 : slidePercentage / 50
            }}
          >
            <Card className="p-6 bg-green-500/10 border-green-500/20 h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-green-400 mb-2">DEPOIS - Com Funcionários Digitais</h3>
                  <p className="text-foreground/70">Baixo custo, alta eficiência</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <Users className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">{afterData.employees} Funcionários + {afterData.digitalEmployees} Digitais</div>
                      <div className="text-sm text-foreground/60">Equipe híbrida otimizada</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">R$ {afterData.monthlyCost.toLocaleString()}/mês</div>
                      <div className="text-sm text-foreground/60">Custo total reduzido</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">{afterData.efficiency}% Eficiência</div>
                      <div className="text-sm text-foreground/60">Produtividade premium</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">{afterData.errors} erro/mês</div>
                      <div className="text-sm text-foreground/60">Precisão digital</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-500/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">R$ 130k</div>
                    <div className="text-sm text-foreground/60">Custo anual</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Card className="p-6 bg-gold/10 border-gold/20 inline-block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gold">75%</div>
                <div className="text-sm text-foreground/70">Redução de Custos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">R$ 388k</div>
                <div className="text-sm text-foreground/70">Economia Anual</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">30%</div>
                <div className="text-sm text-foreground/70">Aumento Eficiência</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterComparison;
