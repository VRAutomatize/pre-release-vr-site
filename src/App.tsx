
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import { TypeformProvider } from "./contexts/TypeformContext";
import { GlobalOptimizedTypeformModal } from "./components/form/GlobalOptimizedTypeformModal";
import ProtectedRoute from "./components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";

// Better loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      <p className="text-sm text-foreground/60">Carregando...</p>
    </div>
  </div>
);

// Create a PageLoader component with Skeleton
const PageLoader = () => (
  <div className="container mx-auto px-4 pt-24 space-y-8">
    <Skeleton className="h-64 w-full rounded-xl" />
    <Skeleton className="h-32 w-3/4 mx-auto rounded-xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
    </div>
  </div>
);

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
const Reports = lazy(() => import("./pages/employee/Reports"));
const Devs = lazy(() => import("./pages/employee/Devs"));
const PaymentLinks = lazy(() => import("./pages/employee/PaymentLinks"));

// Memoized query client with improved caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes of cache
      retry: 1,
      gcTime: 600000, // 10 minutes cache (previously cacheTime)
    },
  },
});

// Animation layout with optimized auto-scroll
const AnimationLayout = () => {
  const location = useLocation();
  
  // Optimized scroll to top with useLayoutEffect
  React.useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/services/ai-attendants" element={<AIAttendants />} />
            <Route path="/services/crm" element={<CRM />} />
            <Route path="/services/chatbots" element={<Chatbots />} />
            <Route path="/services/lead-capture" element={<LeadCapture />} />
            <Route path="/services/automation" element={<Automation />} />
            <Route path="/services/consulting" element={<Consulting />} />
            <Route path="/lp-funcionarios-digitais-pro" element={<DigitalEmployees />} />
            <Route path="/lp-funcionarios-digitais-core" element={<DigitalEmployees />} />
            
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
            <Route 
              path="/dashboard/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/payments" 
              element={
                <ProtectedRoute>
                  <PaymentLinks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/devs" 
              element={
                <ProtectedRoute>
                  <Devs />
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
const App = React.memo(() => {
  // Add touch handling optimization for mobile
  useEffect(() => {
    // Fix for 300ms delay on mobile taps
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Add viewport height fix for mobile browsers
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  // Default calendar and webhook configuration
  const defaultCalendarLink = "https://cal.com/vrautomatize/call";
  const defaultWebhookUrl = "https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/form-webhook";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TypeformProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimationLayout />
              {/* Global Optimized Typeform Modal that can be triggered from anywhere */}
              <GlobalOptimizedTypeformModal 
                calendarLink={defaultCalendarLink} 
                webhookUrl={defaultWebhookUrl} 
              />
            </BrowserRouter>
          </TooltipProvider>
        </TypeformProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
});

export default App;
