
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

interface EmailStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ value, onChange, onNext, onPrev }) => {
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!validateEmail(value)) {
      setError('Digite um e-mail válido');
      return;
    }
    onNext();
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-gold" />
        </div>
        <h2 className="text-2xl font-bold">E seu melhor e-mail?</h2>
        <p className="text-foreground/60">
          Vamos usar para enviar o resultado da sua análise
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="text-center text-lg"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-gold hover:bg-gold/90 text-background">
          Continuar
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EmailStep;
