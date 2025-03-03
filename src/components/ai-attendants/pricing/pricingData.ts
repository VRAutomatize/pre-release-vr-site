
export const features = [
  { name: "Atendimento via texto", basic: true, pro: true, advanced: true, premium: true },
  { name: "Agendamentos", basic: true, pro: true, advanced: true, premium: true },
  { name: "Suporte a múltiplos idiomas (PT, EN, ES)", basic: true, pro: true, advanced: true, premium: true },
  { name: "Atendimento via áudio", basic: false, pro: true, advanced: true, premium: true },
  { name: "Agendamentos para equipes", basic: false, pro: true, advanced: true, premium: true },
  { name: "Follow-up automático", basic: false, pro: true, advanced: true, premium: true },
  { name: "Sistema de NPS", basic: false, pro: true, advanced: true, premium: true },
  { name: "RAG inteligente", basic: false, pro: true, advanced: true, premium: true },
  { name: "Suporte prioritário", basic: false, pro: true, advanced: true, premium: true },
  { name: "Atendimento via imagem", basic: false, pro: false, advanced: true, premium: true },
  { name: "Processamento de arquivos", basic: false, pro: false, advanced: true, premium: true },
  { name: "Funcionalidades de SDR", basic: false, pro: false, advanced: true, premium: true },
  { name: "Integração com loja virtual", basic: false, pro: false, advanced: true, premium: true },
  { name: "Recuperação de vendas", basic: false, pro: false, advanced: true, premium: true },
  { name: "Pesquisa e aprendizado automático", basic: false, pro: false, advanced: true, premium: true },
  { name: "Desenvolvimento sob medida", basic: false, pro: false, advanced: false, premium: true },
  { name: "Integrações personalizadas", basic: false, pro: false, advanced: false, premium: true },
  { name: "Treinamento especializado (medicina, etc.)", basic: false, pro: false, advanced: false, premium: true },
  { name: "Suporte a 26 idiomas", basic: false, pro: false, advanced: false, premium: true },
  { name: "Interação assíncrona", basic: false, pro: false, advanced: false, premium: true },
  { name: "Memória e contexto avançados", basic: false, pro: false, advanced: false, premium: true },
  { name: "RAG avançado", basic: false, pro: false, advanced: false, premium: true },
  { name: "Análises de dados personalizadas", basic: false, pro: false, advanced: false, premium: true },
  { name: "Gerenciamento completo", basic: false, pro: false, advanced: false, premium: true },
];

export const plans = [
  {
    name: "Básico",
    monthlyPrice: 790,
    annualTotal: 5790,
    description: "Ideal para pequenas empresas iniciando com IA",
    implementation: 0,
    buttonText: "Experimente Grátis"
  },
  {
    name: "Pro",
    monthlyPrice: 1270,
    annualTotal: 10000,
    description: "O plano essencial para a sua operação",
    implementation: 0,
    highlighted: true,
    buttonText: "Experimente Grátis"
  },
  {
    name: "Avançado",
    monthlyPrice: 1970,
    annualTotal: 16000,
    description: "Solução completa com recursos avançados",
    implementation: 0,
    buttonText: "Experimente Grátis"
  },
  {
    name: "Premium",
    monthlyPrice: 2970,
    annualTotal: 30000,
    description: "Solução personalizada sem limitações",
    implementation: 10000,
    buttonText: "Solicitar Orçamento"
  }
];
