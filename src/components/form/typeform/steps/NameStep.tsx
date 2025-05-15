
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface NameStepProps {
  control: any;
  errors: any;
}

const NameStep: React.FC<NameStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Como podemos te chamar?</h2>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="Seu nome completo"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
          />
        )}
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.fullName.message}
        </p>
      )}
    </div>
  );
};

export default NameStep;
