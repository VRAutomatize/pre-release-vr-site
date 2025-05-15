
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface EmailStepProps {
  control: any;
  errors: any;
}

const EmailStep: React.FC<EmailStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">E seu melhor e-mail?</h2>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            type="email"
            placeholder="seu@email.com"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
          />
        )}
      />
      {errors.email && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.email.message}
        </p>
      )}
    </div>
  );
};

export default EmailStep;
