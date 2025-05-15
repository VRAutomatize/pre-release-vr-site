
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { formatPhone } from "@/utils/paymentUtils";

interface PhoneStepProps {
  control: any;
  errors: any;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu WhatsApp?</h2>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="(00) 00000-0000"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
            onChange={(e) => {
              // Only allow digits
              const cleaned = e.target.value.replace(/\D/g, "");
              field.onChange(cleaned);
            }}
            value={formatPhone(field.value || '')}
          />
        )}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.phone.message}
        </p>
      )}
      <p className="text-sm text-muted-foreground text-center">Apenas números, incluindo DDD</p>
    </div>
  );
};

export default PhoneStep;
