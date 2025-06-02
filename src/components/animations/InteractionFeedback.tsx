
import React from "react";
import { motion } from "framer-motion";

interface InteractionFeedbackProps {
  children: React.ReactNode;
  type?: "press" | "hover" | "tap" | "gentle";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const InteractionFeedback = ({ 
  children, 
  type = "press", 
  disabled = false,
  className = "",
  onClick
}: InteractionFeedbackProps) => {
  
  const animationConfig = {
    press: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1, ease: "easeOut" }
    },
    hover: {
      whileHover: { 
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px rgba(255, 215, 0, 0.15)"
      },
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    tap: {
      whileTap: { scale: 0.95 },
      transition: { duration: 0.1, ease: "easeOut" }
    },
    gentle: {
      whileHover: { scale: 1.01 },
      whileTap: { scale: 0.99 },
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };

  const config = animationConfig[type];

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      {...config}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

export default InteractionFeedback;
