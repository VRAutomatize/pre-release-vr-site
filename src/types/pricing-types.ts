export interface PricingFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

export interface Plan {
  name: string;
  monthlyPrice: number;
  description: string;
  highlighted?: boolean;
}