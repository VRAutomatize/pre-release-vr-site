
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Dynamic page loading for performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AIAttendants = lazy(() => import("./pages/services/AIAttendants"));
const CRM = lazy(() => import("./pages/services/CRM"));
const Chatbots = lazy(() => import("./pages/services/Chatbots"));
const LeadCapture = lazy(() => import("./pages/services/LeadCapture"));
const Automation = lazy(() => import("./pages/services/Automation"));
const Consulting = lazy(() => import("./pages/services/Consulting"));
const DigitalEmployees = lazy(() => import("./pages/services/DigitalEmployees"));

// Employee portal pages
const Login = lazy(() => import("./pages/employee/Login"));
const Dashboard = lazy(() => import("./pages/employee/Dashboard"));

// Memoized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes of cache
    },
  },
});

// Optimized loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
  </div>
);

// Animation layout with optimized auto-scroll
const AnimationLayout = () => {
  const location = useLocation();
  
  // Optimized scroll to top with useLayoutEffect
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/services/ai-attendants" element={<AIAttendants />} />
            <Route path="/services/crm" element={<CRM />} />
            <Route path="/services/chatbots" element={<Chatbots />} />
            <Route path="/services/lead-capture" element={<LeadCapture />} />
            <Route path="/services/automation" element={<Automation />} />
            <Route path="/services/consulting" element={<Consulting />} />
            <Route path="/services/digital-employees" element={<DigitalEmployees />} />
            
            {/* Employee portal routes */}
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};

// Main App with memoization for performance
const App = React.memo(() => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimationLayout />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
));

export default App;
