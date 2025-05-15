
import React from "react";
import { useTypeform } from "@/contexts/TypeformContext";
import { TypeformModal } from "@/components/form/TypeformModal";

interface GlobalTypeformModalProps {
  webhookUrl?: string;
  calendarLink?: string;
}

export function GlobalTypeformModal({ webhookUrl, calendarLink }: GlobalTypeformModalProps) {
  const { isModalOpen, closeModal, showCalendar, setShowCalendar } = useTypeform();

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  return (
    <TypeformModal 
      isOpen={isModalOpen}
      onClose={closeModal}
      webhookUrl={webhookUrl}
      calendarLink={calendarLink}
      showCalendar={showCalendar}
      onShowCalendar={handleShowCalendar}
    />
  );
}
