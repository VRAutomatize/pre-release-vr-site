
import { useState, useEffect, useRef } from "react";

interface MessagesCounterProps {
  className?: string;
}

const MessagesCounter = ({ className }: MessagesCounterProps) => {
  const [savingsAmount, setSavingsAmount] = useState(0);
  const prevValueRef = useRef(0);
  const [difference, setDifference] = useState(0);
  const [showFloatingValue, setShowFloatingValue] = useState(false);
  const targetValue = 742934.90;  // Base value for savings in BRL
  const initialAnimationDuration = 2000;
  const incrementInterval = 3000; // Changed to 3 seconds as requested

  const generateRandomIncrement = () => {
    // Random value between 1400 and 3200
    const minIncrement = 1400;
    const maxIncrement = 3200;
    return Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
  };

  useEffect(() => {
    const steps = 50;
    const stepDuration = initialAnimationDuration / steps;
    const stepValue = targetValue / steps;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setSavingsAmount(prev => Math.min(stepValue * i, targetValue));
      }, stepDuration * i);
    }

    const interval = setInterval(() => {
      setSavingsAmount(prev => {
        const newValue = prev + generateRandomIncrement();
        prevValueRef.current = prev; // Store the previous value before updating
        return newValue;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prevValueRef.current !== 0 && savingsAmount > prevValueRef.current) {
      const diff = savingsAmount - prevValueRef.current;
      setDifference(diff);
      setShowFloatingValue(true);
      
      const timer = setTimeout(() => {
        setShowFloatingValue(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [savingsAmount]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold ${className}`}>
      <span className="text-base">Economia com contratação:</span>
      <div className="relative inline-block">
        <span className="text-lg">{formatCurrency(savingsAmount)}</span>
        {showFloatingValue && difference > 0 && (
          <span 
            className="absolute left-0 -top-6 w-full text-center text-green-500 font-medium animate-float-fade whitespace-nowrap"
          >
            +{formatCurrency(difference)}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessagesCounter;
