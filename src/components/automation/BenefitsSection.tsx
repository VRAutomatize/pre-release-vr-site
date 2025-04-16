
import React from "react";
import { TrendingDown, Zap, LineChart } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-20 relative z-10" id="why-automation">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Por que investir em automação sob medida?
        </h2>
        
        <div className="max-w-3xl mx-auto mt-16 glass rounded-2xl p-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-6 animate-fade-up">
              <div className="bg-gold/20 p-3 rounded-full flex-shrink-0">
                <TrendingDown className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Redução de custos operacionais</h3>
                <p className="text-lg">Um funcionário custa, em média, R$2.500/mês (R$30.000/ano).</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gold/20 p-3 rounded-full flex-shrink-0">
                <Zap className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Eficiência máxima</h3>
                <p className="text-lg">Uma automação com a nossa performance executa mais tarefas, sem pausas, com zero erro e 100% de escalabilidade.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="bg-gold/20 p-3 rounded-full flex-shrink-0">
                <LineChart className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Escalabilidade garantida</h3>
                <p className="text-lg">Você não precisa de mais gente. Precisa de mais eficiência.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
