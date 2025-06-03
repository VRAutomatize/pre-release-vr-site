
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';

interface PhoneStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ value, onChange, onNext, onPrev }) => {
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onChange(formatted);
    setError('');
  };

  const handleNext = () => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length !== 11) {
      setError('Digite um telefone válido com DDD');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Phone className="h-12 w-12 text-gold" />
        </div>
        <h2 className="text-2xl font-bold">Qual seu telefone?</h2>
        <p className="text-foreground/60">
          Vamos usar apenas para entrar em contato sobre sua consulta
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="tel"
          placeholder="(11) 99999-9999"
          value={value}
          onChange={handleChange}
          className="text-center text-lg"
          maxLength={15}
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

export default PhoneStep;
