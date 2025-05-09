
// Calculate the total monthly fee based on selected options
export const calculateMonthlyFee = (options: {
  envia_audio: boolean;
  servidor_dedicado: boolean;
}) => {
  const BASE_FEE = 490; // Base fee R$490,00
  const AUDIO_FEE = options.envia_audio ? 200 : 0; // Audio messages: R$200,00
  const DEDICATED_SERVER_FEE = options.servidor_dedicado ? 100 : 0; // Dedicated server: R$100,00
  
  return BASE_FEE + AUDIO_FEE + DEDICATED_SERVER_FEE;
};

// Format currency in BRL format
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
