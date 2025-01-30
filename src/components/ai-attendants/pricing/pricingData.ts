export const features = [
  { name: "Integração com CRM", basic: true, pro: true, premium: true },
  { name: "Atendimento por Texto", basic: true, pro: true, premium: true },
  { name: "Atendimento por Áudio/Imagem", basic: false, pro: true, premium: true },
  { name: "Atendimento Multilíngue (PT, EN, ES)", basic: false, pro: true, premium: true },
  { name: "Coleta de Dados", basic: "Simples", pro: "Completa", premium: "Avançada" },
  { name: "Agendamentos (Google Agenda)", basic: false, pro: true, premium: true },
  { name: "Follow-up Automático", basic: false, pro: true, premium: true },
  { name: "Sistema NPS (Avaliação Google)", basic: false, pro: true, premium: true },
  { name: "Recuperação de Vendas Automática", basic: false, pro: true, premium: true },
  { name: "RAG Inteligente", basic: false, pro: true, premium: true },
  { name: "Suporte Prioritário", basic: false, pro: true, premium: true },
  { name: "IA Treinada (medicina, psicologia, cálculo, programação...)", basic: false, pro: false, premium: true },
];

export const plans = [
  {
    name: "Básico",
    monthlyPrice: 690,
    description: "Ideal para pequenas empresas iniciando com IA"
  },
  {
    name: "Pro",
    monthlyPrice: 1270,
    description: "Para empresas que precisam de recursos avançados",
    highlighted: true
  },
  {
    name: "Premium",
    monthlyPrice: 1970,
    description: "Solução completa com IA especializada"
  }
];