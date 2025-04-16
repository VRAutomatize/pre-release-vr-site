
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

// Carregamento dinâmico das páginas para melhorar performance inicial
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AIAttendants = lazy(() => import("./pages/services/AIAttendants"));
const CRM = lazy(() => import("./pages/services/CRM"));
const Chatbots = lazy(() => import("./pages/services/Chatbots"));
const LeadCapture = lazy(() => import("./pages/services/LeadCapture"));
const Automation = lazy(() => import("./pages/Automation"));
const AutomationService = lazy(() => import("./pages/services/Automation"));
const Consulting = lazy(() => import("./pages/services/Consulting"));

// Cliente de consulta de dados memoizado 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita consultas desnecessárias ao focar na janela
      staleTime: 300000, // 5 minutos de cache para dados
    },
  },
});

// Componente de loading otimizado
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
  </div>
);

// AnimationLayout com scroll automático otimizado
const AnimationLayout = () => {
  const location = useLocation();
  
  // Scroll para o topo otimizado com useLayoutEffect para acontecer antes da renderização
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/services/ai-attendants" element={<AIAttendants />} />
            <Route path="/services/crm" element={<CRM />} />
            <Route path="/services/chatbots" element={<Chatbots />} />
            <Route path="/services/lead-capture" element={<LeadCapture />} />
            <Route path="/services/automation" element={<AutomationService />} />
            <Route path="/services/consulting" element={<Consulting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};

// Componente App com memoização para prevenir renderizações desnecessárias
const App = React.memo(() => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimationLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
));

export default App;
