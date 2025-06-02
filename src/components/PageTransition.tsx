
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Configurações de animação memorizadas
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    backgroundColor: "rgb(17, 24, 39)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    backgroundColor: "rgb(17, 24, 39)"
  },
  exit: { 
    opacity: 0, 
    y: -20,
    backgroundColor: "rgb(17, 24, 39)"
  }
};

const pageTransition = {
  duration: 0.3, 
  ease: "easeInOut"
};

// Componente memoizado para evitar renderizações desnecessárias
const PageTransition = memo(({ children }: PageTransitionProps) => {
  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="bg-gray-900 min-h-screen w-full"
        style={{ backgroundColor: 'rgb(17, 24, 39)' }}
      >
        {children}
      </motion.div>
    </div>
  );
});

export default PageTransition;
