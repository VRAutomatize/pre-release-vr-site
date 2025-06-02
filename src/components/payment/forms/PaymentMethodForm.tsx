
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product } from "@/types/payment";
import { formatCurrency } from "@/utils/paymentUtils";
import { PaymentFormData } from "../PaymentForm";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PaymentMethodFormProps {
  products: Product[];
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ products }) => {
  const form = useFormContext<PaymentFormData>();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'space-y-5' : 'space-y-6'}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Detalhes do Pagamento</h3>
        
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-100 font-medium">Produto/Serviço *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-gray-800/50 border-gray-600 text-gray-100 focus:border-gold focus:ring-gold/20 ${isMobile ? 'py-3 text-base' : ''}`}>
                    <SelectValue placeholder="Selecione um produto" className="text-gray-400" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {products.map((product) => (
                    <SelectItem 
                      key={product.id} 
                      value={product.name}
                      className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {product.name}
                      {product.price > 0 && (
                        <span className="text-gray-400 ml-2">
                          - {formatCurrency(product.price)}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Valor (R$) *</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="number"
                step="0.01"
                min="1"
                max="50000"
                placeholder="0,00"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormDescription className="text-gray-300 text-sm">
              Valor entre R$ 1,00 e R$ 50.000,00
            </FormDescription>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Método de Pagamento *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={`${isMobile ? 'space-y-3' : 'space-y-2'}`}
              >
                <div className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-600 bg-gray-800/30 hover:bg-gray-800/50 transition-colors ${isMobile ? 'py-4' : ''}`}>
                  <RadioGroupItem 
                    value="pix" 
                    id="pix" 
                    className="border-gray-400 text-gold focus:ring-gold/20"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor="pix" 
                      className={`text-gray-100 font-medium cursor-pointer ${isMobile ? 'text-base' : 'text-sm'}`}
                    >
                      PIX
                    </label>
                    <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                      Pagamento instantâneo via PIX
                    </p>
                  </div>
                </div>
                <div className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-600 bg-gray-800/30 hover:bg-gray-800/50 transition-colors ${isMobile ? 'py-4' : ''}`}>
                  <RadioGroupItem 
                    value="credit_card" 
                    id="credit_card" 
                    className="border-gray-400 text-gold focus:ring-gold/20"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor="credit_card" 
                      className={`text-gray-100 font-medium cursor-pointer ${isMobile ? 'text-base' : 'text-sm'}`}
                    >
                      Cartão de Crédito
                    </label>
                    <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                      Pagamento com cartão via link
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentMethodForm;
