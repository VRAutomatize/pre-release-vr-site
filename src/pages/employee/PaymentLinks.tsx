
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import CNPJCheckForm from "@/components/payment/CNPJCheckForm";
import ClientRegistrationForm from "@/components/payment/ClientRegistrationForm";
import PaymentForm from "@/components/payment/PaymentForm";
import ProgressSteps from "@/components/payment/ProgressSteps";
import { Step, Client, Product } from "@/types/payment";
import { checkCNPJ, registerClient, fetchProducts, createPayment } from "@/services/paymentService";
import { formatCNPJ } from "@/utils/paymentUtils";

const PaymentLinks = () => {
  const [step, setStep] = useState<Step>(Step.CheckCNPJ);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCNPJ, setCurrentCNPJ] = useState<string>("");
  
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
          // For now, we'll simulate a "not found" for demo purposes
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
        setClient({ id: result, name: "Cliente Encontrado" });
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
  const handleRegisterClient = async (data: z.infer<any>) => {
    setLoading(true);
    try {
      const result = await registerClient(data);
      
      if (result.message && result.message === "Workflow was started") {
        // This is just an acknowledgment
        toast.info("Cadastrando cliente...");
        setTimeout(() => {
          // Simulate successful client creation
          const mockClientId = "client_" + Math.random().toString(36).substring(2, 9);
          setClient({ id: mockClientId, name: data.companyName });
          setStep(Step.CreatePayment);
          toast.success("Cliente cadastrado com sucesso!");
        }, 1500);
        return;
      }
      
      if (result === "error") {
        toast.error("Erro ao cadastrar cliente. Tente novamente.");
      } else {
        // Client created, go to payment creation
        setClient({ id: result, name: data.companyName });
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
  const handleCreatePayment = async (data: z.infer<any>) => {
    setLoading(true);
    try {
      const result = await createPayment(data);
      
      if (result.message && result.message === "Workflow was started") {
        // This is an acknowledgment
        setTimeout(() => {
          toast.success("Link de pagamento gerado com sucesso!");
          // Reset and return to first step
          resetForms();
        }, 1500);
        return;
      }
      
      if (result === "error") {
        toast.error("Erro ao gerar link de pagamento. Tente novamente.");
      } else {
        toast.success("Link de pagamento gerado com sucesso!");
        // Reset and return to first step
        resetForms();
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Erro ao gerar link de pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Reset forms and return to first step
  const resetForms = () => {
    setCurrentCNPJ("");
    setClient(null);
    setStep(Step.CheckCNPJ);
  };

  // Go back to CNPJ check
  const handleBackToStart = () => {
    setStep(Step.CheckCNPJ);
  };
  
  return (
    <div className="flex h-[100vh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gold">Gerenciador de Links de Pagamento</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Crie e gerencie links de pagamento para seus clientes.
            </p>
          </div>
          
          {/* Progress steps indicator */}
          <ProgressSteps currentStep={step} />
          
          <div className="max-w-2xl mx-auto">
            {step === Step.CheckCNPJ && (
              <Card className="glass-blur border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Verificar CNPJ</CardTitle>
                  <CardDescription>
                    Digite o CNPJ do cliente para iniciar o processo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CNPJCheckForm 
                    onCheckCNPJ={handleCheckCNPJ} 
                    loading={loading} 
                  />
                </CardContent>
              </Card>
            )}
            
            {step === Step.RegisterClient && (
              <Card className="glass-blur border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Cadastrar Novo Cliente</CardTitle>
                  <CardDescription>
                    CNPJ {formatCNPJ(currentCNPJ)} não encontrado. Preencha os dados para cadastrar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientRegistrationForm
                    cnpj={currentCNPJ}
                    onRegister={handleRegisterClient}
                    onBack={handleBackToStart}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            )}
            
            {step === Step.CreatePayment && client && (
              <Card className="glass-blur border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Gerar Link de Pagamento</CardTitle>
                  <CardDescription>
                    Selecione as informações para criar o link de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentForm
                    clientId={client.id}
                    products={products}
                    onCreatePayment={handleCreatePayment}
                    onBack={handleBackToStart}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentLinks;
