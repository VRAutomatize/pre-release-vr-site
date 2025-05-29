
import React from "react";
import { Calculator } from "lucide-react";
import { TypeformButton } from "@/components/form/TypeformButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const MobileStickyCTA = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-gold/20 safe-area-pb">
      <TypeformButton
        icon={Calculator}
        className="w-full bg-gold hover:bg-gold-light text-background py-4 text-lg font-semibold shadow-lg"
        trackingId="mobile_sticky_cta"
        trackingSection="mobile_sticky"
        trackingMetadata={{
          position: "bottom_fixed",
          type: "mobile_only"
        }}
      >
        Calcule sua Economia Grátis
      </TypeformButton>
    </div>
  );
};

export default MobileStickyCTA;
