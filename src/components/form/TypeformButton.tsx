
import React from "react";
import { Button } from "@/components/ui/button";
import { useTypeform } from "@/contexts/TypeformContext";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
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
  trackingMetadata = {}
}: TypeformButtonProps) {
  const { openModal } = useTypeform();
  const { trackEvent } = useConversionAnalytics();
  
  const handleClick = () => {
    // Track the CTA click
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
        ...trackingMetadata
      }
    );

    // Open the modal
    openModal();
  };
  
  return (
    <Button 
      className={cn(className)} 
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
