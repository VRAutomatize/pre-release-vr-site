
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  showCalendar?: boolean;
  onShowCalendar?: () => void;
}

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos (com DDD)")
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

export function TypeformModal({ 
  isOpen, 
  onClose, 
  calendarLink = "https://cal.com/vrautomatize/call", 
  webhookUrl = "",
  showCalendar = false,
  onShowCalendar 
}: TypeformModalProps) {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressData, setProgressData] = useState<Partial<FormData>>({});
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  
  const { control, handleSubmit, watch, trigger, getValues, setValue, formState: { errors, isValid }, reset } = useForm<FormData>({
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
      reset(defaultValues);
      setCalendarLoaded(false);
    }
  }, [isOpen, reset]);

  // Load Cal.com script dynamically when calendar view is shown
  useEffect(() => {
    if (showCalendar && isOpen) {
      // Create Cal.com script
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => {
        // Initialize Cal.com after script is loaded
        if (window.Cal) {
          window.Cal("init", "call", {origin: "https://cal.com"});
          // Wait a bit for Cal to initialize
          setTimeout(() => {
            if (window.Cal && window.Cal.ns && window.Cal.ns.call) {
              window.Cal.ns.call("inline", {
                elementOrSelector: "#cal-embed-container",
                config: {
                  "layout": "month_view",
                  "theme": "dark",
                },
                calLink: "vrautomatize/call",
              });
              window.Cal.ns.call("ui", {
                "theme": "dark",
                "hideEventTypeDetails": true,
                "layout": "month_view"
              });
              setCalendarLoaded(true);
            }
          }, 500);
        }
      };
      document.head.appendChild(script);
      
      // Cleanup function to remove script when modal is closed
      return () => {
        try {
          document.head.removeChild(script);
        } catch (error) {
          console.error("Error removing Cal script:", error);
        }
      };
    }
  }, [showCalendar, isOpen]);

  // Handle key press for form navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Enter' && !isSubmitting && !showCalendar) {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, currentStep, showCalendar]);

  // Function to send partial form data to webhook
  const sendPartialData = useCallback(async () => {
    if (!webhookUrl) return;
    
    const currentValues = getValues();
    const dataToSend = { ...progressData, ...currentValues };
    setProgressData(dataToSend);
    
    try {
      console.log("Sending partial data to webhook:", dataToSend);
      
      // Using fetch with no-cors mode to avoid CORS issues with webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...dataToSend,
          step: currentStep,
          timestamp: new Date().toISOString(),
          isPartial: true
        }),
      });
    } catch (error) {
      console.error("Failed to send partial data:", error);
      // Don't show error to user for partial data sends
    }
  }, [webhookUrl, getValues, progressData, currentStep]);
  
  // Handle next step click
  const handleNextStep = useCallback(async () => {
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
  }, [currentStep, totalSteps, sendPartialData, trigger, getValues, paidTraffic]);
  
  // Handle form submission
  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Final webhook submission with complete data
      if (webhookUrl) {
        console.log("Sending complete form data to webhook:", data);
        
        // Using fetch with no-cors mode to avoid CORS issues
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
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
        description: "Carregando calendário de agendamento...",
        duration: 3000,
      });
      
      // Show embedded calendar
      if (onShowCalendar) {
        onShowCalendar();
      }
      
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
            <h2 className="text-2xl font-bold text-gold text-center">Como podemos te chamar?</h2>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  placeholder="Seu nome completo"
                  className="text-lg py-6 text-center"
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
      
      case 1: // Phone
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">Qual seu WhatsApp?</h2>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  placeholder="Digite apenas números com DDD"
                  className="text-lg py-6 text-center"
                  onChange={(e) => {
                    // Only allow digits
                    const cleaned = e.target.value.replace(/\D/g, "");
                    field.onChange(cleaned);
                  }}
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
      
      case 2: // Email
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">E seu melhor e-mail?</h2>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  type="email"
                  placeholder="seu@email.com"
                  className="text-lg py-6 text-center"
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
      
      case 3: // Instagram
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">Qual seu Instagram?</h2>
            <Controller
              name="instagram"
              control={control}
              render={({ field }) => (
                <div className="relative max-w-md mx-auto">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <Input
                    {...field}
                    autoFocus
                    placeholder="seu.perfil"
                    className="text-lg py-6 pl-8 text-center"
                  />
                </div>
              )}
            />
            <p className="text-sm text-muted-foreground text-center">Opcional</p>
          </div>
        );
      
      case 4: // Monthly Revenue
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">Qual sua média de faturamento mensal?</h2>
            <Controller
              name="monthlyRevenue"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4 max-w-md mx-auto"
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
            <h2 className="text-2xl font-bold text-gold text-center">Você já investe em tráfego pago?</h2>
            <Controller
              name="paidTraffic"
              control={control}
              render={({ field }) => (
                <div className="space-y-6 max-w-md mx-auto">
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
              <h2 className="text-2xl font-bold text-gold text-center">Quanto investe mensalmente em tráfego pago?</h2>
              <Controller
                name="trafficInvestment"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-4 max-w-md mx-auto"
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
            <h2 className="text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <div className="max-w-md mx-auto">
                  <Textarea
                    {...field}
                    autoFocus
                    placeholder="Descreva o ramo de atuação da sua empresa"
                    className="text-lg py-4 min-h-[120px] text-center"
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
      
      case 7: // Industry (only if paid traffic is true)
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <div className="max-w-md mx-auto">
                  <Textarea
                    {...field}
                    autoFocus
                    placeholder="Descreva o ramo de atuação da sua empresa"
                    className="text-lg py-4 min-h-[120px] text-center"
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
      
      default:
        return null;
    }
  };
  
  // Progress calculation
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  // If showing calendar view
  if (showCalendar) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background border-gold/20 p-0 overflow-hidden"
        >
          {/* Close button - single one */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 rounded-full p-2 bg-black/50 text-gold hover:bg-black/70 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Loading indicator for calendar */}
          {!calendarLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-40">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 text-gold animate-spin" />
                <p className="text-lg">Carregando calendário de agendamento...</p>
              </div>
            </div>
          )}
          
          {/* Cal.com embed container */}
          <div id="cal-embed-container" className="w-full h-full"></div>
        </DialogContent>
      </Dialog>
    );
  }

  // Form view
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl w-[95vw] h-[95vh] bg-background border-gold/20 p-0 overflow-hidden"
      >
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200">
          <div 
            className="h-1.5 bg-gold transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="p-6 h-full flex flex-col">
          {/* Close button - single one */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-800 transition-colors z-50 text-gold"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Step content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Current step content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-8"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="mt-auto flex justify-between">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={isSubmitting}
                className="text-base"
              >
                Voltar
              </Button>
            )}
            <div className={`${currentStep === 0 ? 'w-full flex justify-center' : 'ml-auto'}`}>
              <Button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className={`${currentStep === 0 ? 'w-full max-w-md' : ''} bg-[#ffdd00] hover:bg-[#e6c700] text-black font-medium text-base py-6`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                    Enviando
                  </>
                ) : currentStep === totalSteps - 1 ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
