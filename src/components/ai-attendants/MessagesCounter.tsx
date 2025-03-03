
import { useState, useEffect, useRef } from "react";

interface MessagesCounterProps {
  className?: string;
}

const MessagesCounter = ({ className }: MessagesCounterProps) => {
  const [messagesCount, setMessagesCount] = useState(0);
  const prevValueRef = useRef(0);
  const [difference, setDifference] = useState(0);
  const [showFloatingValue, setShowFloatingValue] = useState(false);
  const targetValue = 128765;  // Number for completed service interactions
  const initialAnimationDuration = 2000;
  const incrementInterval = 3000;

  const generateRandomIncrement = () => {
    const rand = Math.random();
    const minValue = 1;
    const lambda = 0.001;
    const maxValue = 50;
    
    const value = minValue + (-Math.log(1 - rand * (1 - Math.exp(-lambda * (maxValue - minValue)))) / lambda);
    return Math.min(Math.round(value), maxValue);
  };

  useEffect(() => {
    const steps = 50;
    const stepDuration = initialAnimationDuration / steps;
    const stepValue = targetValue / steps;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setMessagesCount(prev => Math.min(stepValue * i, targetValue));
      }, stepDuration * i);
    }

    const interval = setInterval(() => {
      setMessagesCount(prev => {
        const newValue = prev + generateRandomIncrement();
        return newValue;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prevValueRef.current !== messagesCount && messagesCount > prevValueRef.current) {
      const diff = messagesCount - prevValueRef.current;
      setDifference(diff);
      setShowFloatingValue(true);
      
      const timer = setTimeout(() => {
        setShowFloatingValue(false);
      }, 1500);
      
      prevValueRef.current = messagesCount;
      
      return () => clearTimeout(timer);
    }
  }, [messagesCount]);

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold ${className}`}>
      <span className="text-base">Atendimentos realizados:</span>
      <div className="relative inline-block">
        <span className="text-lg">{formatNumber(messagesCount)}</span>
        {showFloatingValue && difference > 0 && (
          <span 
            className="absolute left-0 -top-6 w-full text-center text-green-500 font-medium animate-float-fade whitespace-nowrap"
          >
            +{formatNumber(difference)}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessagesCounter;
