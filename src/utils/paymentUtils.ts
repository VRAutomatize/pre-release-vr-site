
/**
 * Format a number as a Brazilian currency (BRL)
 * @param value - The number value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Check if payment value is invalid (less than R$100)
 */
export const isValueInvalid = (value: number): boolean => {
  return value < 100;
};
