
export const calculatePrice = (monthlyPrice: number, isAnnual: boolean) => {
  if (isAnnual) {
    return (monthlyPrice * 12).toFixed(2);
  }
  return monthlyPrice.toFixed(2);
};

export const calculateAnnualTotal = (monthlyPrice: number) => {
  return (monthlyPrice * 12).toFixed(2);
};

export const calculateInstallments = (annualTotal: number) => {
  const installmentWithInterest = (annualTotal / 12) * 1.15;
  // Round down to nearest 10 cents for more commercial pricing
  return Math.floor(installmentWithInterest * 10) / 10;
};

export const formatCurrency = (value: number) => {
  const hasDecimals = value % 1 !== 0;
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0
  });
};

export const getBasicFeatures = (features: any[]) => {
  return features.filter(feature => 
    feature.basic === true
  ).map(feature => feature.name);
};

export const getProFeatures = (features: any[]) => {
  return features.filter(feature => 
    feature.pro === true && feature.basic === false
  ).map(feature => feature.name);
};

export const getAdvancedFeatures = (features: any[]) => {
  return features.filter(feature => 
    feature.advanced === true && feature.pro === false && feature.basic === false
  ).map(feature => feature.name);
};

export const getPremiumFeatures = (features: any[]) => {
  return features.filter(feature => 
    feature.premium === true && feature.advanced === false && feature.pro === false && feature.basic === false
  ).map(feature => feature.name);
};
