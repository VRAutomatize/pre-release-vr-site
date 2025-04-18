
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import HeroTag from "../shared/HeroTag";
import HeroTitle from "../shared/HeroTitle";
import HeroDescription from "../shared/HeroDescription";
import HeroActions from "../shared/HeroActions";

interface HeroSectionProps {
  whatsappLink: string;
}

const HeroSection = ({ whatsappLink }: HeroSectionProps) => {
  const [salesValue, setSalesValue] = useState(0);
  const prevValueRef = useRef(0);
  const [difference, setDifference] = useState(0);
  const [showFloatingValue, setShowFloatingValue] = useState(false);
  const targetValue = 574930;
  const initialAnimationDuration = 2000;
  const incrementInterval = 5000;

  const generateRandomIncrement = () => {
    const rand = Math.random();
    const minValue = 23.3;
    const lambda = 0.0003;
    const maxValue = 22000;
    
    const value = minValue + (-Math.log(1 - rand * (1 - Math.exp(-lambda * (maxValue - minValue)))) / lambda);
    return Math.min(Math.round(value * 100) / 100, maxValue);
  };

  useEffect(() => {
    const steps = 50;
    const stepDuration = initialAnimationDuration / steps;
    const stepValue = targetValue / steps;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setSalesValue(prev => Math.min(stepValue * i, targetValue));
      }, stepDuration * i);
    }

    const interval = setInterval(() => {
      setSalesValue(prev => prev + generateRandomIncrement());
    }, incrementInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prevValueRef.current !== salesValue) {
      const diff = salesValue - prevValueRef.current;
      setDifference(diff);
      setShowFloatingValue(true);
      
      const timer = setTimeout(() => {
        setShowFloatingValue(false);
      }, 1500);
      
      prevValueRef.current = salesValue;
      
      return () => clearTimeout(timer);
    }
  }, [salesValue]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold animate-fade-up">
              <span className="text-base">Vendas recuperadas:</span>
              <div className="relative inline-block">
                <span className="text-lg">{formatCurrency(salesValue)}</span>
                {showFloatingValue && difference > 0 && (
                  <span 
                    className="absolute left-0 -top-6 w-full text-center text-green-500 font-medium animate-float-fade whitespace-nowrap"
                  >
                    +{formatCurrency(difference)}
                  </span>
                )}
              </div>
            </div>
            
            <HeroTitle>
              Chega de Queimar Dinheiro: 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mt-2">
                CRM que Transforma Tráfego em Vendas!
              </span>
            </HeroTitle>

            <HeroDescription>
              Transforme seu tráfego pago em vendas reais: recuperamos clientes sem resposta, 
              automatizamos processos e ajudamos seus vendedores a focar no que importa, 
              enquanto sua empresa fatura mais.
            </HeroDescription>

            <HeroActions>
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
            </HeroActions>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
