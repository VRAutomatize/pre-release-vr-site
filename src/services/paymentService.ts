
import { toast } from "sonner";
import { AddressInfo, PaymentResult } from "@/types/payment";
import { PaymentFormData } from "@/components/payment/PaymentForm";

const API_BASE_URL = "https://vrautomatize-n8n.snrhk1.easypanel.host";

// Check CNPJ and find client - POST request
export const checkCNPJ = async (cnpj: string) => {
  try {
    console.log("Checking CNPJ:", cnpj);
    const response = await fetch(`${API_BASE_URL}/webhook/find_cnpj`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpj }),
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
    
    return result;
  } catch (error) {
    console.error("Error checking CNPJ:", error);
    throw error;
  }
};

// Register a new client
export const registerClient = async (clientData: any) => {
  try {
    console.log("Registering client with data:", clientData);
    const response = await fetch(`${API_BASE_URL}/webhook/create_client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Get response as text first
    const responseText = await response.text();
    console.log("Client registration response text:", responseText);
    
    // Try to parse as JSON if possible, otherwise return the text directly (client ID)
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      // If it's not JSON, it might be a plain text client ID
      result = responseText;
    }
    
    console.log("Client registration result:", result);
    
    return result;
  } catch (error) {
    console.error("Error registering client:", error);
    throw error;
  }
};

// Fetch available products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/webhook/list_products`);
    
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
      throw new Error("Invalid response format");
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Create payment link
export const createPayment = async (paymentData: PaymentFormData): Promise<PaymentResult> => {
  try {
    console.log("Creating payment with data:", paymentData);
    const response = await fetch(`${API_BASE_URL}/webhook/criar_cobranca`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Handle potential plain text response
    const responseText = await response.text();
    console.log("Payment creation response text:", responseText);
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      // If not JSON (might be base64 image directly)
      result = responseText;
    }
    
    console.log("Payment creation result:", result);
    
    // If the result is a direct base64 string (for PIX)
    if (typeof result === "string" && paymentData.paymentMethod === "pix") {
      // Check if it's a base64 image
      if (result.startsWith("data:image")) {
        return {
          qrCodeImage: result,
          paymentMethod: paymentData.paymentMethod,
          value: paymentData.value,
          productName: paymentData.productName
        };
      }
    }
    
    // For credit card or other structured responses
    return {
      paymentLink: typeof result === "string" ? result : result?.link,
      paymentMethod: paymentData.paymentMethod,
      value: paymentData.value,
      productName: paymentData.productName
    };
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// Check CEP and get address information
export const checkCEP = async (cep: string): Promise<AddressInfo | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/webhook/check-cep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cep }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const responseText = await response.text();
    console.log("CEP check response:", responseText);

    // Try to parse as JSON if possible
    try {
      const result = JSON.parse(responseText);
      
      // Check if the API returned an error
      if (result.erro === "true") {
        return null;
      }
      
      // Map the API response to our AddressInfo type
      return {
        cep: result.cep || "",
        street: result.logradouro || "",
        neighborhood: result.bairro || "",
        city: result.localidade || "",
        state: result.uf || "",
        // Add any additional fields that might be useful
        complemento: result.complemento || "",
        // Keep the original fields for compatibility
        logradouro: result.logradouro || "",
        bairro: result.bairro || "",
        localidade: result.localidade || "",
        uf: result.uf || "",
        unidade: result.unidade || "",
        ibge: result.ibge || "",
        gia: result.gia || "",
        ddd: result.ddd || "",
        siafi: result.siafi || ""
      };
    } catch (e) {
      console.error("Failed to parse CEP response:", e);
      return null;
    }
  } catch (error) {
    console.error("Error checking CEP:", error);
    return null;
  }
};
