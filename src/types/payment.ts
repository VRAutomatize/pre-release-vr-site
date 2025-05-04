
// Define types for API responses and form data
export interface Client {
  id: string;
  name: string;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  price?: number;
}

export enum Step {
  CheckCNPJ,
  RegisterClient,
  CreatePayment,
  PaymentResult,
}

export interface AddressInfo {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  // Additional fields from the API
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

export interface PaymentResult {
  qrCodeImage?: string; // Base64 encoded image for PIX QR code
  paymentLink?: string; // Link for credit card payments
  paymentMethod: "pix" | "credit_card";
  value: number;
  productName: string;
}
