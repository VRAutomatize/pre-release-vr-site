
// Define types for API responses and form data
export interface Client {
  id: string;
  name: string;
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
}
