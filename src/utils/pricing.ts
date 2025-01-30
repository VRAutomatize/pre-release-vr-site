export const calculatePrice = (monthlyPrice: number, isAnnual: boolean) => {
  if (isAnnual) {
    const annualPrice = monthlyPrice * 12;
    const discount = annualPrice * 0.30;
    return ((annualPrice - discount) / 12).toFixed(2);
  }
  return monthlyPrice.toFixed(2);
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