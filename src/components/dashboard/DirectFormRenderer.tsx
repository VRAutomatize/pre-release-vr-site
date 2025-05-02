
import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2, ChevronRight, Check, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface DirectFormRendererProps {
  formUrl: string;
  onClose: () => void;
}

type FormData = {
  nome_empresa: string;
  area_atuacao: string;
  interesse: string;
  nome_cliente: string;
  telefone_cliente: string;
  email_cliente: string;
  valor_implementacao: string;
  envia_audio: boolean;
  servidor_dedicado: boolean;
};

// Multi-step form setup
type FormStep = 1 | 2 | 3;

export function DirectFormRenderer({ formUrl, onClose }: DirectFormRendererProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formError, setFormError] = useState<string | null>(null);
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted, isDirty },
    trigger
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nome_empresa: "",
      area_atuacao: "",
      interesse: "",
      nome_cliente: "",
      telefone_cliente: "",
      email_cliente: "",
      valor_implementacao: "",
      envia_audio: false,
      servidor_dedicado: false,
    },
  });
  
  // Watch form values for validation
  const watchedFields = watch();
  
  // Determine form type based on URL
  const isGerarVendaForm = formUrl.includes("gerar_venda") || formUrl.includes("venda");
  
  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Extract seller tag from email (if available)
      let sellerTag = "";
      if (data.email_cliente && data.email_cliente.includes("@")) {
        sellerTag = data.email_cliente.split("@")[0];
      }
      
      // Prepare data for webhook
      const webhookData = {
        ...data,
        seller_tag: sellerTag,
        venda_direta: true
      };
      
      // Send data to webhook
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/gerar-venda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Show success message
      toast({
        title: "Venda registrada com sucesso!",
        description: "Os dados foram enviados para processamento.",
      });
      
      // Close the form
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormError("Falha ao enviar o formulário. Por favor, tente novamente.");
      
      toast({
        title: "Erro ao registrar venda",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle step transitions with validation
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    // Define which fields to validate based on current step
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["nome_empresa", "area_atuacao"];
        break;
      case 2:
        fieldsToValidate = ["nome_cliente", "telefone_cliente", "email_cliente"];
        break;
      default:
        break;
    }
    
    // Validate fields before proceeding
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => (prev < 3 ? (prev + 1) as FormStep : prev));
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => (prev > 1 ? (prev - 1) as FormStep : prev));
  };
  
  // Progress indicator calculation
  const progress = ((currentStep - 1) / 2) * 100;

  if (!isGerarVendaForm) {
    return (
      <div className="h-full w-full overflow-auto bg-[#1A1F2C] p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          <div className="glass-blur rounded-lg p-6 border border-gold/20">
            <h2 className="text-xl md:text-2xl font-semibold text-gold mb-2">Formulário não suportado</h2>
            <p className="text-gold/70 mb-6">Este tipo de formulário ainda não está disponível para visualização direta.</p>
            
            <Button onClick={onClose} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
              Fechar
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full overflow-auto bg-[#1A1F2C] p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <div className="glass-blur rounded-lg p-6 border border-gold/20">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gold mb-2">Gerar Venda</h2>
            <p className="text-gold/70 mb-4">Preencha o formulário para registrar uma nova venda no sistema</p>
            
            {/* Progress bar */}
            <div className="w-full bg-[rgba(255,215,0,0.1)] h-1 rounded-full mb-2">
              <div 
                className="bg-gold h-1 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gold/50 mb-4">
              <span className={currentStep >= 1 ? "text-gold" : ""}>Empresa</span>
              <span className={currentStep >= 2 ? "text-gold" : ""}>Cliente</span>
              <span className={currentStep >= 3 ? "text-gold" : ""}>Serviços</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="nome_empresa" className="text-[#d4d4d8]">
                    Nome da Empresa <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="nome_empresa"
                    placeholder="Digite o nome da empresa"
                    {...register("nome_empresa", { required: "Nome da empresa é obrigatório" })}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.nome_empresa && (
                    <p className="text-red-400 text-sm mt-1">{errors.nome_empresa.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="area_atuacao" className="text-[#d4d4d8]">
                    Área de Atuação
                  </Label>
                  <Input
                    id="area_atuacao"
                    placeholder="Ex: E-commerce, Consultoria, Saúde..."
                    {...register("area_atuacao")}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interesse" className="text-[#d4d4d8]">
                    Interesse <span className="text-gold">*</span>
                  </Label>
                  <Textarea
                    id="interesse"
                    placeholder="Descreva o interesse do cliente"
                    {...register("interesse", { required: "Descrição do interesse é obrigatória" })}
                    className="min-h-[120px] bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.interesse && (
                    <p className="text-red-400 text-sm mt-1">{errors.interesse.message}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: Client Information */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="nome_cliente" className="text-[#d4d4d8] flex items-center gap-2">
                    <User className="h-4 w-4 text-gold" />
                    Nome do Cliente <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="nome_cliente"
                    placeholder="Nome completo do cliente"
                    {...register("nome_cliente", { required: "Nome do cliente é obrigatório" })}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.nome_cliente && (
                    <p className="text-red-400 text-sm mt-1">{errors.nome_cliente.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone_cliente" className="text-[#d4d4d8] flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gold" />
                    Telefone <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="telefone_cliente"
                    placeholder="(00) 00000-0000"
                    {...register("telefone_cliente", { required: "Telefone do cliente é obrigatório" })}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.telefone_cliente && (
                    <p className="text-red-400 text-sm mt-1">{errors.telefone_cliente.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email_cliente" className="text-[#d4d4d8] flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gold" />
                    Email
                  </Label>
                  <Input
                    id="email_cliente"
                    placeholder="cliente@empresa.com"
                    {...register("email_cliente", { 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Endereço de email inválido"
                      }
                    })}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.email_cliente && (
                    <p className="text-red-400 text-sm mt-1">{errors.email_cliente.message}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 3: Service Options */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="valor_implementacao" className="text-[#d4d4d8]">
                    Valor da Implementação <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="valor_implementacao"
                    placeholder="R$ 0,00"
                    {...register("valor_implementacao", { required: "Valor da implementação é obrigatório" })}
                    className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
                  />
                  {errors.valor_implementacao && (
                    <p className="text-red-400 text-sm mt-1">{errors.valor_implementacao.message}</p>
                  )}
                </div>
                
                <div className="space-y-4 rounded-lg bg-[rgba(255,255,255,0.02)] p-4 border border-[rgba(255,215,0,0.1)]">
                  <h3 className="text-gold font-medium">Opções adicionais</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="envia_audio" className="text-[#d4d4d8]">
                        Envio de áudio
                      </Label>
                      <p className="text-xs text-[#9ca3af]">Permite envio de mensagens de áudio</p>
                    </div>
                    <Switch
                      id="envia_audio"
                      {...register("envia_audio")}
                      className="data-[state=checked]:bg-gold"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="servidor_dedicado" className="text-[#d4d4d8]">
                        Servidor dedicado
                      </Label>
                      <p className="text-xs text-[#9ca3af]">Infraestrutura exclusiva</p>
                    </div>
                    <Switch
                      id="servidor_dedicado"
                      {...register("servidor_dedicado")}
                      className="data-[state=checked]:bg-gold"
                    />
                  </div>
                </div>
                
                {formError && (
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-md text-sm text-red-400">
                    {formError}
                  </div>
                )}
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                  className="border-gold/20 text-gold hover:bg-gold/10"
                  disabled={isSubmitting}
                >
                  Voltar
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="border-gold/20 text-gold hover:bg-gold/10"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium"
                  disabled={isSubmitting}
                >
                  Próximo <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Finalizar
                    </span>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
