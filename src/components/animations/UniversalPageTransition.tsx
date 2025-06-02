
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";

interface UniversalPageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Professional easing curves inspired by iOS
const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  spring: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.4, 0, 0.2, 1]
} as const;

const DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5
} as const;

const UniversalPageTransition = ({ children, className = "" }: UniversalPageTransitionProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Different animations for mobile vs desktop
  const mobileVariants = {
    initial: {
      opacity: 0,
      x: 30,
      scale: 0.98,
      filter: "blur(2px)"
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: DURATIONS.normal,
        ease: EASING.smooth,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -30,
      scale: 0.98,
      filter: "blur(2px)",
      transition: {
        duration: DURATIONS.fast,
        ease: EASING.gentle
      }
    }
  };

  const desktopVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.99
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: DURATIONS.normal,
        ease: EASING.smooth,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.99,
      transition: {
        duration: DURATIONS.fast,
        ease: EASING.gentle
      }
    }
  };

  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`h-full w-full ${className}`}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default UniversalPageTransition;
