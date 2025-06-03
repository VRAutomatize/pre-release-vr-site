
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const calculateInstallments = (total: number, installments: number = 12): number => {
  return Math.round((total / installments) * 100) / 100;
};
