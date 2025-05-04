
// Helper function to calculate commission percentage based on value
export const getCommissionPercentage = (value: number): number => {
  if (value < 950) return 20;
  if (value < 1300) return 30;
  return 35;
};

// Helper function to calculate commission amount
export const calculateCommission = (value: number): number => {
  const percentage = getCommissionPercentage(value);
  return (value * percentage) / 100;
};
