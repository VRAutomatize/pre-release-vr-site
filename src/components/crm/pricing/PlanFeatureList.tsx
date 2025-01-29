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
            className={`animate-fade-up flex items-center justify-between`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-1.5 h-1.5 rounded-full ${highlighted ? 'bg-gold' : 'bg-gray-500'}`} />
              <span className="text-sm text-foreground/80">
                {feature.name}
              </span>
            </div>
            {feature.value && (
              <>
                <div className="mx-4 border-t border-dashed border-foreground/20 flex-1" />
                <span className="text-sm text-gold">
                  {feature.value}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanFeatureList;