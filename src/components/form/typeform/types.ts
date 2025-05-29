
import { z } from "zod";

// Form schema for validation
export const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos (com DDD)")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  email: z.string().email("Email inválido"),
  instagram: z.string().optional(),
  monthlyRevenue: z.enum([
    "0-50000", 
    "50001-100000", 
    "100001-300000", 
    "300001-500000", 
    "500001-1000000", 
    "1000001-5000000"
  ]),
  paidTraffic: z.boolean(),
  trafficInvestment: z.enum(["0-1000", "1001-3000", "3001-5000", "5001-10000", "10000+"]).optional(),
  industry: z.string().min(3, "Por favor, informe seu ramo de atuação"),
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  fullName: "",
  phone: "",
  email: "",
  instagram: "",
  monthlyRevenue: "0-50000",
  paidTraffic: false,
  industry: "",
};
