
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Configurações de animação memorizadas
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.3, 
  ease: "easeInOut"
};

// Componente memoizado para evitar renderizações desnecessárias
const PageTransition = memo(({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
});

export default PageTransition;
