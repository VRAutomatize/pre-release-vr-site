
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useBehavioralSegmentation } from "@/hooks/useBehavioralSegmentation";
import { useContextualVariant } from "./contextual-cta/hooks/useContextualVariant";
import { useUrgencyAnimation } from "./contextual-cta/hooks/useUrgencyAnimation";
import { CTAContent } from "./contextual-cta/CTAContent";
import { UrgencyIndicator } from "./contextual-cta/UrgencyIndicator";

interface ContextualCTAProps {
  sectionId: string;
}

const ContextualCTA: React.FC<ContextualCTAProps> = ({ sectionId }) => {
  const { currentSegment, trackCTAClick } = useBehavioralSegmentation();
  
  const cta = useContextualVariant(currentSegment.type, sectionId);
  const urgencyAnimation = useUrgencyAnimation(cta.urgency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={urgencyAnimation}
      transition={{
        duration: cta.urgency === "high" ? 2 : 4,
        repeat: cta.urgency === "high" ? Infinity : 0
      }}
      className="my-8"
    >
      <Card className={`${cta.bgColor} border-2 ${cta.color.replace('text-', 'border-').replace('/30', '/50')} relative overflow-hidden`}>
        <CTAContent
          cta={cta}
          sectionId={sectionId}
          currentSegmentType={currentSegment.type}
          trackCTAClick={trackCTAClick}
        />
        
        <UrgencyIndicator urgency={cta.urgency} />
      </Card>
    </motion.div>
  );
};

export default ContextualCTA;
