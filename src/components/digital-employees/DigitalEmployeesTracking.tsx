
import React from "react";
import { useConversionAnalytics } from "@/hooks/useConversionAnalytics";

export const useDigitalEmployeesTracking = () => {
  const { trackEvent } = useConversionAnalytics();

  const whatsappLink = React.useCallback(() => "https://wa.me/554792666367?text=Olá!%20Tenho%20interesse%20em%20Funcionários%20Digitais!", []);

  const handleWhatsAppClick = React.useCallback(() => {
    trackEvent('whatsapp_click', 'click', 'header_whatsapp', 'header', {
      buttonText: 'Entre em contato',
      source: 'header_navigation',
    });
    window.open(whatsappLink(), '_blank');
  }, [trackEvent, whatsappLink]);

  const handleHomeClick = React.useCallback(() => {
    trackEvent('navigation_click', 'click', 'home_link', 'header', {
      destination: 'home',
      source: 'header_navigation',
    });
  }, [trackEvent]);

  return {
    whatsappLink,
    handleWhatsAppClick,
    handleHomeClick
  };
};
