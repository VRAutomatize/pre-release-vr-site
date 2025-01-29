export interface PlanFeature {
  name: string;
  included: boolean;
  value?: string;
}

export interface Plan {
  name: string;
  features: PlanFeature[];
  implementation: number;
  monthly: number;
  installments: number;
  canInstallImplementation: boolean;
}