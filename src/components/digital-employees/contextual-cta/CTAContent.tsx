
import React from "react";
import { TypeformButton } from "@/components/form/TypeformButton";
import { CTAVariant, SegmentType } from "./types";
import { UrgencyBadge } from "./UrgencyBadge";

interface CTAContentProps {
  cta: CTAVariant;
  sectionId: string;
  currentSegmentType: SegmentType;
  trackCTAClick: () => void;
}

export const CTAContent: React.FC<CTAContentProps> = ({
  cta,
  sectionId,
  currentSegmentType,
  trackCTAClick
}) => {
  const IconComponent = cta.icon;

  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${cta.bgColor}`}>
          <IconComponent className={`h-6 w-6 ${cta.color}`} />
        </div>
        
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${cta.color} mb-2`}>
            {cta.title}
          </h3>
          <p className="text-foreground/80 mb-4">
            {cta.description}
          </p>
          
          <div className="flex items-center gap-4">
            <TypeformButton
              className={`${
                cta.urgency === "high" 
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                  : "bg-gold hover:bg-gold-light text-background"
              } px-6 py-3 text-base font-medium`}
              trackingId={`contextual_cta_${cta.id}`}
              trackingSection={sectionId}
              trackingMetadata={{
                segment: currentSegmentType,
                urgency: cta.urgency,
                ctaVariant: cta.id,
                ctaClick: () => trackCTAClick()
              }}
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {cta.buttonText}
            </TypeformButton>
            
            <UrgencyBadge urgency={cta.urgency} />
          </div>
        </div>
      </div>
    </div>
  );
};
