
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface NativePageTransitionProps {
  children: React.ReactNode;
}

const NativePageTransition = ({ children }: NativePageTransitionProps) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 50,
      scale: 0.95
    },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default NativePageTransition;
