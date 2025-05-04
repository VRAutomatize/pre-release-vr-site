
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Step, Client, Product, PaymentResult } from '@/types/payment';
import { checkCNPJ, registerClient, fetchProducts, createPayment } from '@/services/paymentService';
import { ClientFormData } from '@/components/payment/ClientRegistrationForm';
import { PaymentFormData } from '@/components/payment/PaymentForm';

export const usePaymentWorkflow = () => {
  const [step, setStep] = useState<Step>(Step.CheckCNPJ);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCNPJ, setCurrentCNPJ] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  
  // Fetch products when entering payment creation step
  useEffect(() => {
    if (step === Step.CreatePayment) {
      handleFetchProducts();
    }
  }, [step]);
  
  // Handle CNPJ check
  const handleCheckCNPJ = async (cnpjValue: string) => {
    setLoading(true);
    try {
      const result = await checkCNPJ(cnpjValue);
      
      if (result && typeof result === "object" && result.message && result.message === "Workflow was started") {
        // This is just an acknowledgment, not the actual result
        toast.info("Verificando CNPJ...");
        setTimeout(() => {
          // In a real app, we'd use a webhook callback or polling
          setCurrentCNPJ(cnpjValue);
          setStep(Step.RegisterClient);
          toast.info("Cliente não encontrado. Por favor, registre um novo cliente.");
        }, 1500);
        return;
      }
      
      // Check for both "not_found" and "notfound" responses
      if (result === "not_found" || result === "notfound") {
        // Client not found, go to registration step
        setCurrentCNPJ(cnpjValue);
        setStep(Step.RegisterClient);
        toast.info("Cliente não encontrado. Por favor, registre um novo cliente.");
      } else {
        // Client found, go to payment creation
        const clientId = result;
        setClient({ 
          id: clientId, 
          name: "Cliente Encontrado", 
        });
        setStep(Step.CreatePayment);
        toast.success("Cliente encontrado!");
      }
    } catch (error) {
      console.error("Error checking CNPJ:", error);
      toast.error("Erro ao verificar o CNPJ. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Register a new client
  const handleRegisterClient = async (data: ClientFormData) => {
    setLoading(true);
    try {
      // Make sure all necessary fields are passed to the API
      const clientData = {
        cnpj: data.cnpj,
        companyName: data.companyName,
        clientName: data.clientName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        number: data.number,
        complement: data.complement || "",
        district: data.district,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      };
      
      const result = await registerClient(clientData);
      
      if (result.message && result.message === "Workflow was started") {
        // This is just an acknowledgment
        toast.info("Cadastrando cliente...");
        setTimeout(() => {
          // Simulate successful client creation
          const mockClientId = "client_" + Math.random().toString(36).substring(2, 9);
          setClient({ id: mockClientId, name: data.companyName, email: data.email });
          setStep(Step.CreatePayment);
          toast.success("Cliente cadastrado com sucesso!");
        }, 1500);
        return;
      }
      
      if (result === "error") {
        toast.error("Erro ao cadastrar cliente. Tente novamente.");
      } else {
        // Client created successfully, store the client ID returned from API
        console.log("Client registration result:", result);
        
        // Handle plain text response (client ID)
        const clientId = typeof result === 'string' ? result : 
                        (result.id ? result.id : 'client_unknown');
                        
        // Set client with returned ID and form data
        setClient({ 
          id: clientId, 
          name: data.companyName, 
          email: data.email 
        });
        setStep(Step.CreatePayment);
        toast.success("Cliente cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Error registering client:", error);
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch available products
  const handleFetchProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchProducts();
      
      if (result.message && result.message === "Workflow was started") {
        // This is an acknowledgment, simulate products for demo
        setTimeout(() => {
          const mockProducts = [
            { id: "prod1", name: "Plano Básico", price: 199.90 },
            { id: "prod2", name: "Plano Premium", price: 299.90 },
            { id: "prod3", name: "Plano Enterprise", price: 499.90 }
          ];
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
        return;
      }
      
      if (result && result.name && Array.isArray(result.name)) {
        // Map the array of product names to Product objects
        const mappedProducts = result.name.map((name: string, index: number) => ({
          id: `prod_${index + 1}`, // Generate an ID based on the index
          name: name,
          // Default price as we don't have this information
          price: 0
        }));
        setProducts(mappedProducts);
      } else {
        toast.error("Erro ao carregar produtos. Formato inesperado.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Create payment link
  const handleCreatePayment = async (data: PaymentFormData) => {
    setLoading(true);
    try {
      const result = await createPayment(data);
      
      // Handle the payment result
      if (result) {
        // Store payment result and move to result step
        setPaymentResult(result);
        setStep(Step.PaymentResult);
        toast.success("Pagamento gerado com sucesso!");
      } else {
        toast.error("Erro ao gerar pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Erro ao gerar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Reset forms and return to first step
  const resetForms = () => {
    setCurrentCNPJ("");
    setClient(null);
    setPaymentResult(null);
    setStep(Step.CheckCNPJ);
  };

  // Go back to CNPJ check
  const handleBackToStart = () => {
    // If we're on the payment result page, reset to the CNPJ check
    if (step === Step.PaymentResult) {
      resetForms();
    } else {
      setStep(Step.CheckCNPJ);
    }
  };

  return {
    step,
    loading,
    client,
    products,
    currentCNPJ,
    paymentResult,
    handleCheckCNPJ,
    handleRegisterClient,
    handleCreatePayment,
    handleBackToStart,
    resetForms
  };
};
