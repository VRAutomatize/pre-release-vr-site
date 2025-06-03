
export interface PlanFeature {
  name: string;
  included: boolean;
  value?: string;
}

export interface Plan {
  name: string;
  features: PlanFeature[];
  costs: {
    implementation: number;
    monthly: number;
    installments: number;
    canInstallImplementation: boolean;
    maxInstallments: number;
  };
  highlighted?: boolean;
}
