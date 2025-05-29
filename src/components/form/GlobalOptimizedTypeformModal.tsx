
import React from "react";
import { useTypeform } from "@/contexts/TypeformContext";
import { OptimizedTypeformModal } from "@/components/form/OptimizedTypeformModal";

interface GlobalOptimizedTypeformModalProps {
  webhookUrl?: string;
  calendarLink?: string;
}

export function GlobalOptimizedTypeformModal({ webhookUrl, calendarLink }: GlobalOptimizedTypeformModalProps) {
  const { isModalOpen, closeModal, showCalendar, setShowCalendar } = useTypeform();

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  return (
    <OptimizedTypeformModal 
      isOpen={isModalOpen}
      onClose={closeModal}
      webhookUrl={webhookUrl}
      showCalendar={showCalendar}
      onShowCalendar={handleShowCalendar}
      calendarLink="vrautomatize/call"
    />
  );
}
