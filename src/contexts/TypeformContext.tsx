
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TypeformContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

const TypeformContext = createContext<TypeformContextType | undefined>(undefined);

export const TypeformProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setShowCalendar(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setShowCalendar(false), 300); // Delay to allow animation
  };

  return (
    <TypeformContext.Provider
      value={{ 
        isModalOpen, 
        openModal, 
        closeModal, 
        showCalendar, 
        setShowCalendar 
      }}
    >
      {children}
    </TypeformContext.Provider>
  );
};

export const useTypeform = () => {
  const context = useContext(TypeformContext);
  
  if (context === undefined) {
    throw new Error("useTypeform must be used within a TypeformProvider");
  }
  
  return context;
};
