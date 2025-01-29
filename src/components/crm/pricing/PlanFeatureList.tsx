import { PlanFeature } from "@/types/pricing";

interface PlanFeatureListProps {
  features: PlanFeature[];
  highlighted?: boolean;
}

const PlanFeatureList = ({ features, highlighted }: PlanFeatureListProps) => {
  return (
    <div className={`p-6 ${highlighted ? 'bg-gold/5' : ''}`}>
      <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
      <div className="grid grid-cols-1 gap-4">
        {features.map((feature, index) => (
          <div 
            key={feature.name} 
            className={`animate-fade-up glass rounded-lg p-4 hover:bg-white/10 transition-all duration-300`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-gold' : 'bg-gray-500'}`} />
                <span className="text-sm text-foreground/80">
                  {feature.name}
                </span>
              </div>
              {feature.value && (
                <span className="text-sm font-medium text-gold">
                  {feature.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanFeatureList;