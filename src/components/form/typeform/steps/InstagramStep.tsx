
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';

interface InstagramStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

const InstagramStep: React.FC<InstagramStepProps> = ({ 
  value, 
  onChange, 
  onNext, 
  onPrev, 
  isLastStep 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // Remove @ if user types it
    if (newValue.startsWith('@')) {
      newValue = newValue.slice(1);
    }
    onChange(newValue);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Instagram className="h-12 w-12 text-gold" />
        </div>
        <h2 className="text-2xl font-bold">Qual seu Instagram?</h2>
        <p className="text-foreground/60">
          Opcional - nos ajuda a conhecer melhor seu perfil
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">@</span>
          </div>
          <Input
            type="text"
            placeholder="seu.perfil"
            value={value}
            onChange={handleChange}
            className="text-center text-lg pl-8"
            autoFocus
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={onNext} className="flex-1 bg-gold hover:bg-gold/90 text-background">
          {isLastStep ? 'Finalizar' : 'Continuar'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default InstagramStep;
