export interface PlanFeature {
  name: string;
  included: boolean;
  value?: string;
}

export interface PlanCosts {
  implementation: number;
  monthly: number;
  installments: number;
  canInstallImplementation: boolean;
  maxInstallments: number;
}

export interface Plan {
  name: string;
  features: PlanFeature[];
  costs: PlanCosts;
  highlighted?: boolean;
}