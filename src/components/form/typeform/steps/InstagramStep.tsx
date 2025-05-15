
import React from "react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface InstagramStepProps {
  control: any;
}

const InstagramStep: React.FC<InstagramStepProps> = ({ control }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu Instagram?</h2>
      <Controller
        name="instagram"
        control={control}
        render={({ field }) => (
          <div className="relative max-w-md mx-auto w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">@</span>
            </div>
            <Input
              {...field}
              autoFocus
              placeholder="seu.perfil"
              className="text-lg py-6 pl-8 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
            />
          </div>
        )}
      />
      <p className="text-sm text-muted-foreground text-center">Opcional</p>
    </div>
  );
};

export default InstagramStep;
