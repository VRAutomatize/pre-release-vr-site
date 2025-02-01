import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  whatsappLink: string;
}

const HeroSection = ({ whatsappLink }: HeroSectionProps) => {
  const [salesValue, setSalesValue] = useState(0);
  const targetValue = 574930;
  const initialAnimationDuration = 2000; // 2 seconds for initial animation
  const incrementInterval = 5000; // 5 seconds between each small increment
  const smallIncrementValue = 1500; // Amount to increment by

  useEffect(() => {
    // Initial rapid animation from 0 to target
    const steps = 50;
    const stepDuration = initialAnimationDuration / steps;
    const stepValue = targetValue / steps;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setSalesValue(prev => Math.min(stepValue * i, targetValue));
      }, stepDuration * i);
    }

    // Continuous small increments after initial animation
    const interval = setInterval(() => {
      setSalesValue(prev => prev + smallIncrementValue);
    }, incrementInterval);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gold/10 text-gold animate-fade-up">
              <span className="font-medium">Vendas recuperadas:</span>
              <span 
                key={salesValue} 
                className="font-bold animate-[slide-up_0.3s_ease-out] transform transition-transform hover:scale-105"
              >
                {formatCurrency(salesValue)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Chega de Queimar Dinheiro: 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mt-2">
                CRM que Transforma Tráfego em Vendas!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
              Transforme seu tráfego pago em vendas reais: recuperamos clientes sem resposta, 
              automatizamos processos e ajudamos seus vendedores a focar no que importa, 
              enquanto sua empresa fatura mais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background h-12 px-8"
              >
                Instalar CRM!
              </a>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 hover:bg-gold hover:text-background"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;