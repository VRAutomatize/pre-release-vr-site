
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { checkCEP } from "@/services/paymentService";
import ConfirmationDialog from "./ConfirmationDialog";
import ClientInfoForm from "./forms/ClientInfoForm";
import AddressForm from "./forms/AddressForm";
import FormActions from "./forms/FormActions";

// Client Registration Schema
export const clientRegistrationSchema = z.object({
  cnpj: z.string(),
  companyName: z.string().min(3, "Nome da empresa é obrigatório"),
  clientName: z.string().min(3, "Nome do cliente é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido")
});

// Define the form data type
export type ClientFormData = z.infer<typeof clientRegistrationSchema>;

// Define valid field names type to ensure type safety
type FormFieldName = keyof ClientFormData;

interface ClientRegistrationFormProps {
  cnpj: string;
  onRegister: (data: ClientFormData) => void;
  onBack: () => void;
  loading: boolean;
}

const ClientRegistrationForm: React.FC<ClientRegistrationFormProps> = ({ cnpj, onRegister, onBack, loading }) => {
  const [addressLoading, setAddressLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<ClientFormData | null>(null);
  
  // Initialize with the correct shape - all fields set to false initially
  const [autoFilledFields, setAutoFilledFields] = useState<Record<FormFieldName, boolean>>({
    cnpj: false,
    companyName: false,
    clientName: false,
    email: false,
    phone: false,
    address: false,
    number: false,
    complement: false,
    district: false,
    city: false,
    state: false,
    zipCode: false
  });
  
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      cnpj: cnpj,
      companyName: "",
      clientName: "",
      email: "",
      phone: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  // Function to set field value and mark it as auto-filled
  const setAutoFilledValue = (field: FormFieldName, value: string) => {
    if (value) {
      form.setValue(field, value);
      
      // Mark field as auto-filled
      setAutoFilledFields(prev => ({
        ...prev,
        [field]: true
      }));
      
      // Remove the auto-filled status after 1 second
      setTimeout(() => {
        setAutoFilledFields(prev => ({
          ...prev,
          [field]: false
        }));
      }, 1000);
    }
  };

  // Handle CEP lookup
  const handleCEPLookup = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setAddressLoading(true);
    
    try {
      const addressInfo = await checkCEP(cep);
      
      if (addressInfo) {
        // Set all available address fields from the response with visual feedback
        setAutoFilledValue('address', addressInfo.street || addressInfo.logradouro || '');
        setAutoFilledValue('district', addressInfo.neighborhood || addressInfo.bairro || '');
        setAutoFilledValue('city', addressInfo.city || addressInfo.localidade || '');
        setAutoFilledValue('state', addressInfo.state || addressInfo.uf || '');
        
        // If there's a complemento field, set it as well
        if (addressInfo.complemento && addressInfo.complemento !== '') {
          setAutoFilledValue('complement', addressInfo.complemento);
        }
      }
    } catch (error) {
      console.error("Error looking up CEP:", error);
      // No notification needed - silently fail per requirements
    } finally {
      setAddressLoading(false);
    }
  };

  // Handle form submission to show confirmation
  const handleShowConfirmation = (data: ClientFormData) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  // Handle confirmation dialog close
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Handle final submission after confirmation
  const handleConfirmSubmit = () => {
    if (formData) {
      onRegister(formData);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleShowConfirmation)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClientInfoForm form={form} />
            <AddressForm 
              form={form} 
              autoFilledFields={autoFilledFields} 
              handleCEPLookup={handleCEPLookup}
              addressLoading={addressLoading}
            />
          </div>
          
          <FormActions 
            onBack={onBack} 
            loading={loading}
          />
        </form>
      </Form>
      
      {formData && (
        <ConfirmationDialog
          open={showConfirmation}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirmSubmit}
          loading={loading}
          data={formData}
        />
      )}
    </>
  );
};

export default ClientRegistrationForm;
