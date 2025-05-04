
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

/**
 * Validate CNPJ using Brazilian validation algorithm
 * @param cnpj - CNPJ string (numbers only)
 * @returns boolean indicating if CNPJ is valid
 */
export const validateCNPJ = (cnpj: string): boolean => {
  // Remove any non-digit characters
  cnpj = cnpj.replace(/[^\d]/g, '');

  // Check if it has 14 digits and is not a sequence of the same digit
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Calculate first verification digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit = 11 - (sum % 11);
  let firstDigit = digit >= 10 ? 0 : digit;

  // Calculate second verification digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  digit = 11 - (sum % 11);
  let secondDigit = digit >= 10 ? 0 : digit;

  // Check if calculated digits match the provided ones
  return (
    parseInt(cnpj.charAt(12)) === firstDigit &&
    parseInt(cnpj.charAt(13)) === secondDigit
  );
};

/**
 * Format CNPJ with mask: XX.XXX.XXX/XXXX-XX
 * @param cnpj - CNPJ string (numbers only)
 * @returns Formatted CNPJ string
 */
export const formatCNPJ = (cnpj: string): string => {
  // Remove any non-digit characters
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Apply mask
  if (cnpj.length !== 14) {
    return cnpj; // Return as is if not the expected length
  }
  
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

/**
 * Format phone number with mask: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 * @param phone - Phone string (numbers only)
 * @returns Formatted phone string
 */
export const formatPhone = (phone: string): string => {
  // Remove any non-digit characters
  phone = phone.replace(/[^\d]/g, '');
  
  // Apply mask based on length (mobile or landline)
  if (phone.length === 11) {
    // Mobile: (XX) XXXXX-XXXX
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (phone.length === 10) {
    // Landline: (XX) XXXX-XXXX
    return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  // Return as is for other lengths
  return phone;
};

/**
 * Format CEP (postal code) with mask: XXXXX-XXX
 * @param cep - CEP string (numbers only)
 * @returns Formatted CEP string
 */
export const formatCEP = (cep: string): string => {
  // Remove any non-digit characters
  cep = cep.replace(/[^\d]/g, '');
  
  // Apply mask
  if (cep.length !== 8) {
    return cep; // Return as is if not the expected length
  }
  
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};
