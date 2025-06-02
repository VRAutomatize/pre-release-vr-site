
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabTransitionProps {
  children: React.ReactNode;
  tabKey: string;
  direction?: "horizontal" | "vertical";
  className?: string;
}

const TabTransition = ({ 
  children, 
  tabKey, 
  direction = "horizontal", 
  className = "" 
}: TabTransitionProps) => {
  
  const horizontalVariants = {
    initial: {
      opacity: 0,
      x: 20,
      filter: "blur(1px)",
      backgroundColor: "rgb(17, 24, 39)"
    },
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      backgroundColor: "rgb(17, 24, 39)",
      transition: {
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(1px)",
      backgroundColor: "rgb(17, 24, 39)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const verticalVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.98,
      backgroundColor: "rgb(17, 24, 39)"
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      backgroundColor: "rgb(17, 24, 39)",
      transition: {
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      backgroundColor: "rgb(17, 24, 39)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const variants = direction === "horizontal" ? horizontalVariants : verticalVariants;

  return (
    <div className="bg-gray-900 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={tabKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`w-full bg-gray-900 ${className}`}
          style={{ willChange: 'transform, opacity', backgroundColor: 'rgb(17, 24, 39)' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabTransition;
