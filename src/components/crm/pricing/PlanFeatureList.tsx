import { PlanFeature } from "@/types/pricing";

interface PlanFeatureListProps {
  features: PlanFeature[];
  highlighted?: boolean;
}

const PlanFeatureList = ({ features, highlighted }: PlanFeatureListProps) => {
  return (
    <div className={`p-6 ${highlighted ? 'bg-gold/5' : ''}`}>
      <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div 
            key={feature.name} 
            className={`animate-fade-up ${feature.included ? 'opacity-100' : 'opacity-50'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${feature.included ? 'bg-gold' : 'bg-gray-500'}`} />
              <span className="text-sm text-foreground/80">
                {feature.name}
                {feature.value && (
                  <span className="ml-1 text-gold">
                    {feature.value}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanFeatureList;