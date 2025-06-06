
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ExecutiveConfirmationModal } from "./ExecutiveConfirmationModal";

interface ExecutiveButtonProps {
  className?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  trackingId?: string;
  trackingSection?: string;
  trackingMetadata?: Record<string, any>;
  href?: string;
  variant?: "calendar" | "whatsapp";
}

export function ExecutiveButton({ 
  className, 
  children,
  icon: Icon,
  trackingId = "executive_button",
  trackingSection = "unknown",
  trackingMetadata = {},
  href,
  variant = "calendar"
}: ExecutiveButtonProps) {
  const { trackEvent } = useConversionAnalytics();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  const handleClick = () => {
    // Track the initial click
    trackEvent(
      'executive_cta_click_initial',
      'click',
      trackingId,
      trackingSection,
      {
        buttonText: typeof children === 'string' ? children : 'executive_button',
        targetUrl: href,
        isVipFlow: true,
        variant,
        directCalendar: variant === "calendar",
        ...trackingMetadata
      }
    );

    setShowConfirmationModal(true);
  };

  const handleConfirm = () => {
    // Track the confirmation
    trackEvent(
      'executive_cta_confirmed',
      'click',
      trackingId,
      trackingSection,
      {
        buttonText: typeof children === 'string' ? children : 'executive_button',
        targetUrl: href,
        isVipFlow: true,
        variant,
        directCalendar: variant === "calendar",
        confirmed: true,
        ...trackingMetadata
      }
    );

    setShowConfirmationModal(false);

    if (variant === "calendar") {
      // Open calendar directly
      window.open('https://cal.com/vrautomatize/call', '_blank');
    } else if (variant === "whatsapp") {
      // Open WhatsApp
      const whatsappUrl = href || "https://wa.me/554792666367?text=Olá!%20Sou%20empresário%20e%20gostaria%20de%20uma%20reunião%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20é%20superior%20a%20R$%20500k/mês.";
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCancel = () => {
    // Track the cancellation
    trackEvent(
      'executive_cta_cancelled',
      'click',
      trackingId,
      trackingSection,
      {
        buttonText: typeof children === 'string' ? children : 'executive_button',
        targetUrl: href,
        isVipFlow: true,
        variant,
        cancelled: true,
        ...trackingMetadata
      }
    );

    setShowConfirmationModal(false);
  };
  
  return (
    <>
      <Button 
        className={cn(
          "bg-gold hover:bg-gold-light text-background font-bold border border-gold/30 shadow-lg transform hover:scale-105 transition-all duration-300",
          className
        )} 
        onClick={handleClick}
      >
        {Icon && <Icon className="mr-2 h-5 w-5 flex-shrink-0" />}
        {children}
      </Button>

      <ExecutiveConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        variant={variant}
      />
    </>
  );
}
