
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, X, Loader2, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TypeformModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarLink?: string;
  webhookUrl?: string;
}

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string()
    .min(11, "Telefone deve ter pelo menos 11 dígitos (com DDD)")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  email: z.string().email("Email inválido"),
  instagram: z.string().optional(),
  monthlyRevenue: z.enum(["0-5000", "5001-10000", "10001-20000", "20001-50000", "50001-100000", "100000+"]),
  paidTraffic: z.boolean(),
  trafficInvestment: z.enum(["0-1000", "1001-3000", "3001-5000", "5001-10000", "10000+"]).optional(),
  industry: z.string().min(3, "Por favor, informe seu ramo de atuação"),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  fullName: "",
  phone: "",
  email: "",
  instagram: "",
  monthlyRevenue: "0-5000",
  paidTraffic: false,
  industry: "",
};

// Helper function for formatting phone numbers as user types
const formatPhoneNumber = (value: string) => {
  // Remove non-numeric characters
  const cleaned = value.replace(/\D/g, "");
  
  // Format based on the length
  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }
};

export function TypeformModal({ isOpen, onClose, calendarLink = "https://cal.com/your-link", webhookUrl = "" }: TypeformModalProps) {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressData, setProgressData] = useState<Partial<FormData>>({});
  
  const { control, handleSubmit, watch, trigger, getValues, setValue, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const paidTraffic = watch("paidTraffic");
  
  // Total number of steps
  const totalSteps = paidTraffic ? 8 : 7;
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // Function to send partial form data to webhook
  const sendPartialData = async () => {
    if (!webhookUrl) return;
    
    const currentValues = getValues();
    const dataToSend = { ...progressData, ...currentValues };
    setProgressData(dataToSend);
    
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dataToSend,
          step: currentStep,
          timestamp: new Date().toISOString(),
          isPartial: true
        }),
      });
    } catch (error) {
      console.error("Failed to send partial data:", error);
    }
  };
  
  // Handle next step click
  const handleNextStep = async () => {
    // Validate current field before proceeding
    const fieldsToValidate: (keyof FormData)[] = [
      "fullName", 
      "phone", 
      "email", 
      "instagram", 
      "monthlyRevenue", 
      "paidTraffic",
      paidTraffic ? "trafficInvestment" : undefined, 
      "industry"
    ].filter(Boolean) as (keyof FormData)[];
    
    const currentField = fieldsToValidate[currentStep];
    const isValid = await trigger(currentField);
    
    if (isValid) {
      // Send partial data to webhook
      await sendPartialData();
      
      // Move to next step or submit
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        await onSubmitForm(getValues());
      }
    }
  };
  
  // Handle form submission
  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Final webhook submission with complete data
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            isComplete: true,
            timestamp: new Date().toISOString()
          }),
        });
      }
      
      // Show success toast
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Você será redirecionado para o calendário de agendamento",
        duration: 3000,
      });
      
      // Close modal and redirect to calendar
      setTimeout(() => {
        onClose();
        window.location.href = calendarLink;
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to handle form field display based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Name
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Como podemos te chamar?</h2>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  placeholder="Seu nome completo"
                  className="text-lg py-6"
                />
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.fullName.message}
              </p>
            )}
          </div>
        );
      
      case 1: // Phone
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Qual seu WhatsApp?</h2>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  placeholder="(00) 00000-0000"
                  className="text-lg py-6"
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
            <p className="text-sm text-muted-foreground">Utilizaremos para contato via WhatsApp</p>
          </div>
        );
      
      case 2: // Email
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">E seu melhor e-mail?</h2>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  type="email"
                  placeholder="seu@email.com"
                  className="text-lg py-6"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>
        );
      
      case 3: // Instagram
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Qual seu Instagram?</h2>
            <Controller
              name="instagram"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <Input
                    {...field}
                    autoFocus
                    placeholder="seu.perfil"
                    className="text-lg py-6 pl-8"
                  />
                </div>
              )}
            />
            <p className="text-sm text-muted-foreground">Opcional</p>
          </div>
        );
      
      case 4: // Monthly Revenue
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Qual sua média de faturamento mensal?</h2>
            <Controller
              name="monthlyRevenue"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("0-5000")}>
                    <RadioGroupItem value="0-5000" id="r1" />
                    <label htmlFor="r1" className="cursor-pointer w-full">Até R$ 5.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("5001-10000")}>
                    <RadioGroupItem value="5001-10000" id="r2" />
                    <label htmlFor="r2" className="cursor-pointer w-full">R$ 5.001 - R$ 10.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("10001-20000")}>
                    <RadioGroupItem value="10001-20000" id="r3" />
                    <label htmlFor="r3" className="cursor-pointer w-full">R$ 10.001 - R$ 20.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("20001-50000")}>
                    <RadioGroupItem value="20001-50000" id="r4" />
                    <label htmlFor="r4" className="cursor-pointer w-full">R$ 20.001 - R$ 50.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("50001-100000")}>
                    <RadioGroupItem value="50001-100000" id="r5" />
                    <label htmlFor="r5" className="cursor-pointer w-full">R$ 50.001 - R$ 100.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("100000+")}>
                    <RadioGroupItem value="100000+" id="r6" />
                    <label htmlFor="r6" className="cursor-pointer w-full">Acima de R$ 100.000</label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        );
      
      case 5: // Paid Traffic
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Você já investe em tráfego pago?</h2>
            <Controller
              name="paidTraffic"
              control={control}
              render={({ field }) => (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange(true)}>
                    <label className="cursor-pointer w-full">Sim</label>
                    <Switch
                      checked={field.value === true}
                      onCheckedChange={() => field.onChange(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange(false)}>
                    <label className="cursor-pointer w-full">Não</label>
                    <Switch
                      checked={field.value === false}
                      onCheckedChange={() => field.onChange(false)}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        );
      
      case 6: // Traffic Investment (conditional)
        if (paidTraffic) {
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gold">Quanto investe mensalmente em tráfego pago?</h2>
              <Controller
                name="trafficInvestment"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("0-1000")}>
                      <RadioGroupItem value="0-1000" id="t1" />
                      <label htmlFor="t1" className="cursor-pointer w-full">Até R$ 1.000</label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("1001-3000")}>
                      <RadioGroupItem value="1001-3000" id="t2" />
                      <label htmlFor="t2" className="cursor-pointer w-full">R$ 1.001 - R$ 3.000</label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("3001-5000")}>
                      <RadioGroupItem value="3001-5000" id="t3" />
                      <label htmlFor="t3" className="cursor-pointer w-full">R$ 3.001 - R$ 5.000</label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("5001-10000")}>
                      <RadioGroupItem value="5001-10000" id="t4" />
                      <label htmlFor="t4" className="cursor-pointer w-full">R$ 5.001 - R$ 10.000</label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => field.onChange("10000+")}>
                      <RadioGroupItem value="10000+" id="t5" />
                      <label htmlFor="t5" className="cursor-pointer w-full">Acima de R$ 10.000</label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          );
        } 
        // If not using paid traffic, this is the industry step
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Qual seu ramo de atuação?</h2>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px]"
                />
              )}
            />
            {errors.industry && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.industry.message}
              </p>
            )}
          </div>
        );
      
      case 7: // Industry (only if paid traffic is true)
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold">Qual seu ramo de atuação?</h2>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px]"
                />
              )}
            />
            {errors.industry && (
              <p className="text-red-500 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.industry.message}
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Progress calculation
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${isMobile ? 'max-w-[95vw]' : 'max-w-2xl'} bg-background border-gold/20 p-0 overflow-hidden`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200">
          <div 
            className="h-1 bg-gold transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="p-6">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Step content */}
          <div className="min-h-[320px] flex flex-col justify-between">
            {/* Current step content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={isSubmitting}
                >
                  Voltar
                </Button>
              )}
              <div className={currentStep === 0 ? 'w-full' : 'ml-auto'}>
                <Button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className={`${currentStep === 0 ? 'w-full' : ''} bg-gold hover:bg-gold-light text-background`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Enviando
                    </>
                  ) : currentStep === totalSteps - 1 ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Finalizar
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
