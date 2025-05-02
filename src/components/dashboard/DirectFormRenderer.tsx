
import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DirectFormRendererProps {
  formUrl: string;
  onClose: () => void;
}

type FormField = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: {label: string, value: string}[];
};

type FormData = {
  title: string;
  description?: string;
  fields: FormField[];
  submitButtonLabel: string;
};

export function DirectFormRenderer({ formUrl, onClose }: DirectFormRendererProps) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This is a mock function to simulate fetching form structure
  // In a real implementation, you would fetch this from your n8n API
  useEffect(() => {
    const fetchFormStructure = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real implementation, you would make an API call to get form structure
        // For now, we'll simulate with a timeout and mock data based on the URL
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example mock form data
        let mockForm: FormData;
        
        if (formUrl.includes("gerar_venda")) {
          mockForm = {
            title: "Gerar Venda",
            description: "Preencha o formulário para registrar uma nova venda no sistema",
            fields: [
              { id: "cliente", type: "text", label: "Nome do Cliente", required: true },
              { id: "email", type: "email", label: "Email", required: true },
              { id: "telefone", type: "tel", label: "Telefone", required: true },
              { 
                id: "produto", 
                type: "select", 
                label: "Produto", 
                required: true,
                options: [
                  { label: "CRM Premium", value: "crm_premium" },
                  { label: "Chatbot Basic", value: "chatbot_basic" },
                  { label: "AI Attendant Pro", value: "ai_attendant_pro" }
                ]
              },
              { id: "valor", type: "number", label: "Valor (R$)", required: true },
              { id: "observacoes", type: "textarea", label: "Observações" }
            ],
            submitButtonLabel: "Registrar Venda"
          };
        } else if (formUrl.includes("notifica_time_comercial")) {
          mockForm = {
            title: "Notificar Time Comercial",
            description: "Envie uma notificação importante para o time comercial",
            fields: [
              { id: "assunto", type: "text", label: "Assunto", required: true },
              { id: "mensagem", type: "textarea", label: "Mensagem", required: true },
              { 
                id: "prioridade", 
                type: "select", 
                label: "Prioridade", 
                required: true,
                options: [
                  { label: "Baixa", value: "baixa" },
                  { label: "Média", value: "media" },
                  { label: "Alta", value: "alta" }
                ]
              }
            ],
            submitButtonLabel: "Enviar Notificação"
          };
        } else {
          // Generic form for any other URL
          mockForm = {
            title: "Formulário",
            description: "Preencha os campos abaixo",
            fields: [
              { id: "nome", type: "text", label: "Nome", required: true },
              { id: "email", type: "email", label: "Email", required: true },
              { id: "mensagem", type: "textarea", label: "Mensagem", required: true }
            ],
            submitButtonLabel: "Enviar"
          };
        }
        
        setFormData(mockForm);
      } catch (err) {
        console.error("Error fetching form structure:", err);
        setError("Não foi possível carregar o formulário");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFormStructure();
  }, [formUrl]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // In a real implementation, you would submit to the n8n webhook endpoint
      // For now, we'll simulate with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Enviado com sucesso!",
        description: "Seu formulário foi processado",
      });
      
      // Close the form
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível processar seu formulário",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full p-3 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(255,215,0,0.2)] text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all";
    
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
        return (
          <input
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
            value={formValues[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            required={field.required}
            className={`${commonClasses} min-h-[120px]`}
            value={formValues[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case "select":
        return (
          <select
            id={field.id}
            required={field.required}
            className={commonClasses}
            value={formValues[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          >
            <option value="">Selecione uma opção</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#1A1F2C]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gold/80">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#1A1F2C]">
        <div className="text-center space-y-4">
          <p className="text-red-400">{error}</p>
          <Button onClick={onClose} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
            Fechar
          </Button>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#1A1F2C]">
        <div className="text-center space-y-4">
          <p className="text-red-400">Erro ao carregar o formulário</p>
          <Button onClick={onClose} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
            Fechar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto bg-[#1A1F2C] p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <div className="glass-blur rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl md:text-2xl font-semibold text-gold mb-2">{formData.title}</h2>
          {formData.description && (
            <p className="text-gold/70 mb-6">{formData.description}</p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-[#d4d4d8] text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-gold ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
            
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium py-3 rounded-md transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  formData.submitButtonLabel
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
