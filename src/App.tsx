
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TypeformProvider } from "@/contexts/TypeformContext";
import { GlobalCondensedTypeformModal } from "@/components/form/GlobalCondensedTypeformModal";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DigitalEmployees from "./pages/services/DigitalEmployees";
import AIAttendants from "./pages/services/AIAttendants";
import Automation from "./pages/services/Automation";
import CRM from "./pages/services/CRM";
import Consulting from "./pages/services/Consulting";
import Chatbots from "./pages/services/Chatbots";
import LeadCapture from "./pages/services/LeadCapture";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TypeformProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/lp-funcionarios-digitais-pro" element={<DigitalEmployees />} />
                <Route path="/atendentes-ia" element={<AIAttendants />} />
                <Route path="/automacao" element={<Automation />} />
                <Route path="/crm" element={<CRM />} />
                <Route path="/consultoria" element={<Consulting />} />
                <Route path="/chatbots" element={<Chatbots />} />
                <Route path="/captura-leads" element={<LeadCapture />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              
              {/* Global Condensed Form Modal */}
              <GlobalCondensedTypeformModal />
              <Toaster />
            </div>
          </Router>
        </TypeformProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
