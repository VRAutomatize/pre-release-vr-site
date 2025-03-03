
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ClerkLoaded, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIAttendants from "./pages/services/AIAttendants";
import CRM from "./pages/services/CRM";
import Chatbots from "./pages/services/Chatbots";
import LeadCapture from "./pages/services/LeadCapture";
import Automation from "./pages/services/Automation";
import Consulting from "./pages/services/Consulting";
import SignInPage from "./pages/SignIn";
import PageTransition from "./components/PageTransition";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// AnimationLayout component handles route transitions
const AnimationLayout = () => {
  const location = useLocation();
  
  // Scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/services/ai-attendants" element={<AIAttendants />} />
          <Route path="/services/crm" element={<CRM />} />
          <Route path="/services/chatbots" element={<Chatbots />} />
          <Route path="/services/lead-capture" element={<LeadCapture />} />
          <Route path="/services/automation" element={<Automation />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route 
            path="/profile" 
            element={
              <>
                <SignedIn>
                  <Profile />
                </SignedIn>
                <SignedOut>
                  <SignInPage />
                </SignedOut>
              </>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoaded>
          <AnimationLayout />
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
