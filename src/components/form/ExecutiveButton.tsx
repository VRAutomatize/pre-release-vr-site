
import React from "react";
import { Button } from "@/components/ui/button";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ExecutiveButtonProps {
  className?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  trackingId?: string;
  trackingSection?: string;
  trackingMetadata?: Record<string, any>;
  href?: string;
}

export function ExecutiveButton({ 
  className, 
  children,
  icon: Icon,
  trackingId = "executive_button",
  trackingSection = "unknown",
  trackingMetadata = {},
  href
}: ExecutiveButtonProps) {
  const { trackEvent } = useConversionAnalytics();
  
  const handleClick = () => {
    // Track the executive CTA click
    trackEvent(
      'executive_cta_click',
      'click',
      trackingId,
      trackingSection,
      {
        buttonText: typeof children === 'string' ? children : 'executive_button',
        targetUrl: href,
        isVipFlow: true,
        ...trackingMetadata
      }
    );

    // Open executive calendar or WhatsApp
    if (href) {
      window.open(href, '_blank');
    }
  };
  
  return (
    <Button 
      className={cn(
        "bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black font-bold border-2 border-yellow-300 shadow-lg transform hover:scale-105 transition-all duration-300",
        className
      )} 
      onClick={handleClick}
    >
      {Icon && <Icon className="mr-2 h-5 w-5 flex-shrink-0" />}
      {children}
    </Button>
  );
}
