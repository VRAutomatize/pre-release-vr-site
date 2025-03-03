
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

export const pricingFaqs = [
  {
    question: "Existe algum limite de mensagens ou contatos?",
    answer: "Não, todos os nossos planos oferecem mensagens e contatos ilimitados, sem cobrança adicional pelo volume de uso."
  },
  {
    question: "Há algum período de fidelidade?",
    answer: "Não existe período de fidelidade em nossos planos. Você pode cancelar a qualquer momento sem multas ou taxas adicionais."
  },
  {
    question: "Como funciona o período de teste grátis?",
    answer: "Oferecemos 7 dias de teste grátis nos planos Básico, Pro e Avançado para que você possa experimentar a plataforma sem compromisso. Não é necessário cartão de crédito para iniciar o teste."
  },
  {
    question: "Existe custo de implementação?",
    answer: "Os planos Básico, Pro e Avançado não possuem custo de implementação. Apenas o plano Premium, por ser totalmente personalizado, possui um valor de implementação que pode ser parcelado."
  },
  {
    question: "Todos os planos têm acesso ao dashboard?",
    answer: "Sim, todos os planos incluem acesso completo ao dashboard com métricas e opções de personalização para monitorar e otimizar o desempenho do seu funcionário digital."
  },
  {
    question: "Como funciona o suporte a idiomas?",
    answer: "Os planos Básico, Pro e Avançado oferecem suporte a português, inglês e espanhol. O plano Premium amplia para 26 idiomas diferentes."
  },
  {
    question: "Preciso de conhecimento técnico para utilizar a plataforma?",
    answer: "Não, nossa plataforma foi projetada para ser intuitiva e de fácil uso. Além disso, oferecemos suporte para auxiliar em todo o processo de configuração e utilização."
  }
];
