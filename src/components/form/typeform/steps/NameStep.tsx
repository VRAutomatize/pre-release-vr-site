
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, User } from 'lucide-react';

interface NameStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ value, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <User className="h-12 w-12 text-gold" />
        </div>
        <h2 className="text-2xl font-bold">Como podemos te chamar?</h2>
        <p className="text-foreground/60">
          Vamos começar com seu nome completo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Seu nome completo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-center text-lg"
          autoFocus
        />

        <Button 
          type="submit" 
          className="w-full bg-gold hover:bg-gold/90 text-background"
          disabled={!value.trim()}
        >
          Continuar
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default NameStep;
