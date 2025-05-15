
import React from "react";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

interface IndustryStepProps {
  control: any;
  errors: any;
}

const IndustryStep: React.FC<IndustryStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <div className="max-w-md mx-auto w-full">
            <Textarea
              {...field}
              autoFocus
              placeholder="Descreva o ramo de atuação da sua empresa"
              className="text-lg py-4 min-h-[120px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none hover:text-white"
            />
          </div>
        )}
      />
      {errors.industry && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.industry.message}
        </p>
      )}
    </div>
  );
};

export default IndustryStep;
