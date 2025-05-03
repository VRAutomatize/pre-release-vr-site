
// CNPJ validation and formatting utilities
export function validateCNPJ(cnpj: string): boolean {
  // Basic format check
  cnpj = cnpj.replace(/[^\d]/g, '');
  if (cnpj.length !== 14) return false;
  
  // Check for all same digits
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  // Validate check digits
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;
  
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1), 10);
}

// Format CNPJ for display - Memoized version could be added for performance
export function formatCNPJ(cnpj: string): string {
  cnpj = cnpj.replace(/[^\d]/g, '');
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

// Optimize currency formatting with better integer handling
export function formatCurrency(value: number | string): string {
  if (!value && value !== 0) return '';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Format to BRL currency with 2 decimal places
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
}

// Optimized for better integer parsing
export function parseCurrencyToNumber(formatted: string): number {
  if (!formatted) return 0;
  
  // Remove currency symbol, spaces, commas and everything after
  const cleanValue = formatted.replace(/[^\d]/g, '');
  return parseInt(cleanValue) || 0;
}

// Format phone input with improved performance
export function formatPhone(phone: string): string {
  if (!phone) return '';
  
  phone = phone.replace(/\D/g, "");
  if (phone.length > 11) {
    phone = phone.slice(0, 11);
  }
  
  if (phone.length > 7) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
  } else if (phone.length > 2) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  } else if (phone.length > 0) {
    return `(${phone}`;
  }
  
  return phone;
}

// Format CEP input with improved performance
export function formatCEP(cep: string): string {
  if (!cep) return '';
  
  cep = cep.replace(/\D/g, "");
  if (cep.length > 8) {
    cep = cep.slice(0, 8);
  }
  
  if (cep.length > 5) {
    return `${cep.slice(0, 5)}-${cep.slice(5)}`;
  }
  
  return cep;
}

// Optimized value validation
export function isValueInvalid(value: number | undefined): boolean {
  return typeof value === 'number' && (value < 100 || value > 50000);
}
