
import React from "react";
import { motion } from "framer-motion";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton = ({ 
  width = "100%", 
  height = "20px", 
  className = "" 
}: SkeletonProps) => (
  <motion.div
    className={`bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded ${className}`}
    style={{ 
      width, 
      height,
      backgroundSize: "200% 100%",
      willChange: 'background-position'
    }}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
    }}
    transition={{
      duration: 2,
      ease: "linear",
      repeat: Infinity
    }}
  />
);

interface PulseLoadingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const PulseLoading = ({ 
  size = "md", 
  color = "rgb(255, 215, 0)" 
}: PulseLoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full`}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }}
    />
  );
};

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Spinner = ({ 
  size = "md", 
  color = "rgb(255, 215, 0)" 
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full border-t-transparent`}
      style={{ borderColor: `${color}40`, borderTopColor: color }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }}
    />
  );
};

interface StaggeredFadeProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export const StaggeredFade = ({ 
  children, 
  delay = 0.1, 
  className = "" 
}: StaggeredFadeProps) => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: delay
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
