
import React from "react";
import { motion } from "framer-motion";

// Componente para wrappear elementos com animações premium
export const PremiumReveal = ({ 
  children, 
  delay = 0, 
  direction = "up" 
}: { 
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        scale: 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.23, 1, 0.320, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Componente para botões com hover premium
export const PremiumButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  className = "",
  ...props 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  [key: string]: any;
}) => {
  const variants = {
    primary: "button-premium",
    secondary: "bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-background"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${variants[variant]} ${className} relative overflow-hidden`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(255, 215, 0, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Componente para cards com animações premium
export const PremiumCard = ({ 
  children, 
  className = "",
  delay = 0,
  ...props 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.23, 1, 0.320, 1]
      }}
      whileHover={{
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      className={`card-premium transform-gpu perspective-1000 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Componente para texto com efeito de digitação
export const TypewriterText = ({ 
  text, 
  speed = 50,
  className = ""
}: {
  text: string;
  speed?: number;
  className?: string;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * (speed / 1000)
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Componente para contador animado
export const AnimatedCounter = ({ 
  end, 
  duration = 2,
  prefix = "",
  suffix = "",
  className = ""
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: duration,
          ease: "easeOut"
        }}
      >
        {prefix}
        <motion.span
          initial={0}
          whileInView={end}
          viewport={{ once: true }}
          transition={{
            duration: duration,
            ease: "easeOut"
          }}
        >
          {0}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
};

// Componente para loading/skeleton premium
export const PremiumLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`premium-glass rounded-lg p-4 ${className}`}>
      <div className="animate-pulse space-y-3">
        <motion.div
          className="h-4 premium-gold-gradient rounded opacity-30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 premium-gold-gradient rounded opacity-30 w-3/4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="h-4 premium-gold-gradient rounded opacity-30 w-1/2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

// Hook para detectar se elemento está visível (para trigger animations)
export const useInView = (threshold = 0.3) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
};
