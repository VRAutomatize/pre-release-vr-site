
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CalculatorCTAProps {
  onGetConsultation: () => void;
}

const CalculatorCTA = React.memo(({ onGetConsultation }: CalculatorCTAProps) => {
  return (
    <div className="text-center space-y-4">
      <Button
        onClick={onGetConsultation}
        className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Quero Esta Economia Agora!
        <ArrowRight className="ml-2 h-6 w-6" />
      </Button>
      
      <p className="text-sm text-foreground/70">
        ✓ Análise personalizada gratuita • ✓ Sem compromisso • ✓ Resultados em 48h
      </p>
    </div>
  );
});

CalculatorCTA.displayName = "CalculatorCTA";

export default CalculatorCTA;
