import { toast } from "sonner";
import { AddressInfo } from "@/types/payment";

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
    
    const result = await response.json();
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
export const createPayment = async (paymentData: any) => {
  try {
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
    
    const result = await response.json();
    console.log("Payment creation result:", result);
    
    return result;
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
      return result;
    } catch (e) {
      console.error("Failed to parse CEP response:", e);
      return null;
    }
  } catch (error) {
    console.error("Error checking CEP:", error);
    return null;
  }
};
