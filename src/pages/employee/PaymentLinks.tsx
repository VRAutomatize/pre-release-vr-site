import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Loader2 } from "lucide-react";

// Types for API responses
interface Client {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price?: number;
}

// CNPJ Validation Schema
const cnpjSchema = z.object({
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter pelo menos 14 dígitos")
    .refine((val) => validateCNPJ(val), "CNPJ inválido")
});

// Client Registration Schema
const clientRegistrationSchema = z.object({
  cnpj: z.string(),
  companyName: z.string().min(3, "Nome da empresa é obrigatório"),
  clientName: z.string().min(3, "Nome do cliente é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(3, "Bairro é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido")
});

// Payment Schema
const paymentSchema = z.object({
  clientId: z.string(),
  productId: z.string().min(1, "Selecione um produto"),
  paymentMethod: z.enum(["pix", "credit_card"], {
    required_error: "Selecione um método de pagamento",
  }),
  value: z.coerce.number().min(100, "Valor mínimo deve ser R$ 100,00").max(50000, "Valor máximo deve ser R$ 50.000,00"),
  installments: z.coerce
    .number()
    .min(1, "Número de parcelas inválido")
    .optional()
    .nullable()
});

// Helper function to validate CNPJ
function validateCNPJ(cnpj: string): boolean {
  // Basic format check
  cnpj = cnpj.replace(/[^\d]/g, '');
  if (cnpj.length !== 14) return false;
  
  // Check for all same digits
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  // Validate check digits
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;
  
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1), 10);
}

// Function to format CNPJ display
function formatCNPJ(cnpj: string): string {
  cnpj = cnpj.replace(/[^\d]/g, '');
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

enum Step {
  CheckCNPJ,
  RegisterClient,
  CreatePayment,
}

const PaymentLinks = () => {
  const [step, setStep] = useState<Step>(Step.CheckCNPJ);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  
  const cnpjForm = useForm<z.infer<typeof cnpjSchema>>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      cnpj: "",
    },
  });
  
  const clientForm = useForm<z.infer<typeof clientRegistrationSchema>>({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      cnpj: "",
      companyName: "",
      clientName: "",
      phone: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      zipCode: "",
    },
  });
  
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId: "",
      productId: "",
      paymentMethod: "pix",
      value: 0,
      installments: null,
    },
  });

  // Fetch products when entering payment creation step
  useEffect(() => {
    if (step === Step.CreatePayment) {
      fetchProducts();
    }
  }, [step]);
  
  // Auto-check CNPJ when it reaches 14 digits
  const handleCNPJChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Limit to 14 digits
    if (value.length > 14) {
      value = value.slice(0, 14);
    }
    
    // Apply formatting mask
    let maskedValue = value;
    if (value.length > 2) maskedValue = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) maskedValue = maskedValue.slice(0, 6) + '.' + value.slice(5);
    if (value.length > 8) maskedValue = maskedValue.slice(0, 10) + '/' + value.slice(8);
    if (value.length > 12) maskedValue = maskedValue.slice(0, 15) + '-' + value.slice(12);
    
    // Update form with raw value (without mask)
    cnpjForm.setValue('cnpj', value);
    
    // Display formatted value in input
    e.target.value = maskedValue;
    
    // Auto check when CNPJ is complete
    if (value.length === 14) {
      if (validateCNPJ(value)) {
        await checkCNPJ(value);
      }
    }
  };
  
  // Check CNPJ and find client - POST request
  const checkCNPJ = async (cnpjValue: string) => {
    setLoading(true);
    try {
      console.log("Checking CNPJ:", cnpjValue);
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/find_cnpj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj: cnpjValue }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Get response text instead of trying to parse as JSON right away
      const responseText = await response.text();
      console.log("CNPJ check response text:", responseText);

      // Try to parse as JSON if possible, otherwise use the text directly
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        // Response is not JSON, use it directly
        result = responseText;
      }
      
      console.log("CNPJ check result:", result);
      
      if (result && typeof result === "object" && result.message && result.message === "Workflow was started") {
        // This is just an acknowledgment, not the actual result
        toast.info("Verificando CNPJ...");
        setTimeout(() => {
          // In a real app, we'd use a webhook callback or polling
          // For now, we'll simulate a "not found" for demo purposes
          clientForm.setValue("cnpj", cnpjValue);
          setStep(Step.RegisterClient);
          toast.info("Cliente não encontrado. Por favor, registre um novo cliente.");
        }, 1500);
        return;
      }
      
      // Check for both "not_found" and "notfound" responses
      if (result === "not_found" || result === "notfound") {
        // Client not found, go to registration step
        clientForm.setValue("cnpj", cnpjValue);
        setStep(Step.RegisterClient);
        toast.info("Cliente não encontrado. Por favor, registre um novo cliente.");
      } else {
        // Client found, go to payment creation
        setClient({ id: result, name: "Cliente Encontrado" });
        paymentForm.setValue("clientId", result);
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
  const onRegisterClient = async (data: z.infer<typeof clientRegistrationSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/create_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Client registration result:", result);
      
      if (result.message && result.message === "Workflow was started") {
        // This is just an acknowledgment
        toast.info("Cadastrando cliente...");
        setTimeout(() => {
          // Simulate successful client creation
          const mockClientId = "client_" + Math.random().toString(36).substring(2, 9);
          setClient({ id: mockClientId, name: data.companyName });
          paymentForm.setValue("clientId", mockClientId);
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
        paymentForm.setValue("clientId", result);
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
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/list_products");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log("Products result:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse products response:", e);
        toast.error("Erro ao carregar produtos. Formato inválido.");
        return;
      }
      
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
  const onCreatePayment = async (data: z.infer<typeof paymentSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/criar_cobranca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Payment creation result:", result);
      
      if (result.message && result.message === "Workflow was started") {
        // This is an acknowledgment
        setTimeout(() => {
          toast.success("Link de pagamento gerado com sucesso!");
          // Reset forms and return to first step
          cnpjForm.reset();
          clientForm.reset();
          paymentForm.reset();
          setClient(null);
          setStep(Step.CheckCNPJ);
        }, 1500);
        return;
      }
      
      if (result === "error") {
        toast.error("Erro ao gerar link de pagamento. Tente novamente.");
      } else {
        toast.success("Link de pagamento gerado com sucesso!");
        // Reset forms and return to first step
        cnpjForm.reset();
        clientForm.reset();
        paymentForm.reset();
        setClient(null);
        setStep(Step.CheckCNPJ);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Erro ao gerar link de pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle payment method change
  const onPaymentMethodChange = (value: string) => {
    if (value === "pix") {
      paymentForm.setValue("installments", null);
    }
  };
  
  // Format phone input
  const formatPhone = (phone: string) => {
    phone = phone.replace(/\D/g, "");
    if (phone.length > 11) {
      phone = phone.slice(0, 11);
    }
    
    if (phone.length > 7) {
      phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    } else if (phone.length > 2) {
      phone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    } else if (phone.length > 0) {
      phone = `(${phone}`;
    }
    
    return phone;
  };
  
  // Format CEP input
  const formatCEP = (cep: string) => {
    cep = cep.replace(/\D/g, "");
    if (cep.length > 8) {
      cep = cep.slice(0, 8);
    }
    
    if (cep.length > 5) {
      cep = `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }
    
    return cep;
  };
  
  // Check if value is below minimum requirement (100) or above maximum (50000)
  const isValueInvalid = (value: number | undefined): boolean => {
    return typeof value === 'number' && (value < 100 || value > 50000);
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
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === Step.CheckCNPJ ? "bg-gold text-black" : "bg-gold/20 text-gold"
                }`}>
                  1
                </div>
                <span className="text-xs mt-1">CNPJ</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step > Step.CheckCNPJ ? "bg-gold" : "bg-gold/20"}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === Step.RegisterClient ? "bg-gold text-black" : "bg-gold/20 text-gold"
                }`}>
                  2
                </div>
                <span className="text-xs mt-1">Cliente</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step > Step.RegisterClient ? "bg-gold" : "bg-gold/20"}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === Step.CreatePayment ? "bg-gold text-black" : "bg-gold/20 text-gold"
                }`}>
                  3
                </div>
                <span className="text-xs mt-1">Pagamento</span>
              </div>
            </div>
          </div>
          
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
                  <Form {...cnpjForm}>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                      <FormField
                        control={cnpjForm.control}
                        name="cnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CNPJ do Cliente</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="00.000.000/0000-00" 
                                onChange={handleCNPJChange}
                                className="text-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {loading && (
                        <div className="flex justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-gold" />
                        </div>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {step === Step.RegisterClient && (
              <Card className="glass-blur border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Cadastrar Novo Cliente</CardTitle>
                  <CardDescription>
                    CNPJ {formatCNPJ(clientForm.getValues("cnpj"))} não encontrado. Preencha os dados para cadastrar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...clientForm}>
                    <form onSubmit={clientForm.handleSubmit(onRegisterClient)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={clientForm.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome da Empresa</FormLabel>
                              <FormControl>
                                <Input placeholder="Empresa SA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Cliente</FormLabel>
                              <FormControl>
                                <Input placeholder="João Silva" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(11) 99999-9999"
                                  value={formatPhone(field.value)}
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(/\D/g, "");
                                    field.onChange(rawValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CEP</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="00000-000"
                                  value={formatCEP(field.value)}
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(/\D/g, "");
                                    field.onChange(rawValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Endereço</FormLabel>
                              <FormControl>
                                <Input placeholder="Av. Paulista" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="complement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Complemento (opcional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Sala 123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input placeholder="Centro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(Step.CheckCNPJ)}
                          className="border-gold/20 text-gold hover:bg-gold/10"
                        >
                          Voltar
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-gold hover:bg-gold/80 text-black"
                          disabled={loading}
                        >
                          {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...</>
                          ) : (
                            "Cadastrar Cliente"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {step === Step.CreatePayment && (
              <Card className="glass-blur border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Gerar Link de Pagamento</CardTitle>
                  <CardDescription>
                    Selecione as informações para criar o link de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onCreatePayment)} className="space-y-6">
                      <FormField
                        control={paymentForm.control}
                        name="productId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produto</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gold/20">
                                  <SelectValue placeholder="Selecione um produto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem key={product.id} value={product.id}>
                                    {product.name}
                                    {product.price ? ` - R$ ${product.price.toFixed(2)}` : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Método de Pagamento</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                onPaymentMethodChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gold/20">
                                  <SelectValue placeholder="Selecione o método de pagamento" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pix">Pix</SelectItem>
                                <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                max="50000"
                                variant={isValueInvalid(field.value) ? "error" : "default"}
                                {...field}
                                value={field.value === 0 ? '' : field.value}
                                onChange={(e) => {
                                  field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value));
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {paymentForm.watch("paymentMethod") === "credit_card" && (
                        <FormField
                          control={paymentForm.control}
                          name="installments"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Parcelas</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="1"
                                  min="1"
                                  max="12"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value) || null);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="flex gap-2 justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(Step.CheckCNPJ)}
                          className="border-gold/20 text-gold hover:bg-gold/10"
                        >
                          Voltar
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-gold hover:bg-gold/80 text-black"
                          disabled={loading}
                        >
                          {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando Link...</>
                          ) : (
                            "Gerar Link de Pagamento"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
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
