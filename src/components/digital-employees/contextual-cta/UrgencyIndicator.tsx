
import React from "react";
import { motion } from "framer-motion";

interface UrgencyIndicatorProps {
  urgency: "low" | "medium" | "high";
}

export const UrgencyIndicator: React.FC<UrgencyIndicatorProps> = ({ urgency }) => {
  if (urgency !== "high") return null;

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-red-500"
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: 300, ease: "linear" }}
    />
  );
};
