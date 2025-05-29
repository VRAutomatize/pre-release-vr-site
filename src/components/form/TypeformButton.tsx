
import React from "react";
import { Button } from "@/components/ui/button";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
import { useTypeform } from "@/contexts/TypeformContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TypeformButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  icon?: LucideIcon;
  style?: React.CSSProperties;
  trackingId?: string;
  trackingSection?: string;
  trackingMetadata?: Record<string, any>;
  useCondensedForm?: boolean;
}

export function TypeformButton({ 
  className, 
  variant = "default", 
  size = "default",
  children,
  icon: Icon,
  style,
  trackingId = "typeform_button",
  trackingSection = "unknown",
  trackingMetadata = {},
  useCondensedForm = true
}: TypeformButtonProps) {
  const { trackEvent } = useConversionAnalytics();
  const { openModal } = useTypeform();
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    // Track the CTA click with mobile optimization info
    trackEvent(
      'cta_click',
      'click',
      trackingId,
      trackingSection,
      {
        buttonText: typeof children === 'string' ? children : 'button',
        variant,
        size,
        hasIcon: !!Icon,
        directCalendar: false,
        usesForm: true,
        isMobile,
        useCondensedForm: useCondensedForm && isMobile,
        formType: useCondensedForm && isMobile ? 'condensed' : 'standard',
        ...trackingMetadata
      }
    );

    // Open the form modal
    openModal();
  };
  
  return (
    <Button 
      className={cn("w-full mobile-max-w-none", className)} 
      onClick={handleClick}
      variant={variant}
      size={size}
      style={style}
    >
      {Icon && <Icon className="mr-2 h-5 w-5 flex-shrink-0" />}
      {children}
    </Button>
  );
}
