export const calculatePrice = (monthlyPrice: number, isAnnual: boolean) => {
  if (isAnnual) {
    const annualPrice = monthlyPrice * 12;
    const discount = annualPrice * 0.30;
    return ((annualPrice - discount) / 12).toFixed(2);
  }
  return monthlyPrice.toFixed(2);
};

export const calculateAnnualTotal = (monthlyPrice: number) => {
  const annualPrice = monthlyPrice * 12;
  const discount = annualPrice * 0.30;
  return (annualPrice - discount).toFixed(2);
};

export const calculateInstallments = (monthlyPrice: number) => {
  const annualPrice = monthlyPrice * 12;
  const discount = annualPrice * 0.30;
  const totalWithDiscount = annualPrice - discount;
  const totalWithInterest = totalWithDiscount * 1.15; // 15% interest
  return (totalWithInterest / 12).toFixed(2);
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

export const getPremiumFeatures = (features: any[]) => {
  return features.filter(feature => 
    feature.premium === true && feature.pro === false && feature.basic === false
  ).map(feature => feature.name);
};