
import React from "react";
import { useTypeform } from "@/contexts/TypeformContext";
import { CondensedTypeformModal } from "@/components/form/CondensedTypeformModal";

interface GlobalCondensedTypeformModalProps {
  webhookUrl?: string;
  calendarLink?: string;
}

export function GlobalCondensedTypeformModal({ webhookUrl, calendarLink }: GlobalCondensedTypeformModalProps) {
  const { isModalOpen, closeModal, showCalendar, setShowCalendar } = useTypeform();

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  return (
    <CondensedTypeformModal 
      isOpen={isModalOpen}
      onClose={closeModal}
      showCalendar={showCalendar}
      onShowCalendar={handleShowCalendar}
    />
  );
}
