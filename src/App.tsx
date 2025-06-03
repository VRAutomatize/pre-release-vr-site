
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TypeformProvider } from "@/contexts/TypeformContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
import Dashboard from "./pages/employee/Dashboard";
import Reports from "./pages/employee/Reports";
import Login from "./pages/employee/Login";
import PaymentLinks from "./pages/employee/PaymentLinks";
import Devs from "./pages/employee/Devs";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <AuthProvider>
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
                  <Route path="/employee/login" element={<Login />} />
                  <Route path="/employee/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/employee/reports" element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/employee/links" element={
                    <ProtectedRoute>
                      <PaymentLinks />
                    </ProtectedRoute>
                  } />
                  <Route path="/employee/devs" element={
                    <ProtectedRoute>
                      <Devs />
                    </ProtectedRoute>
                  } />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
                
                {/* Global Condensed Form Modal */}
                <GlobalCondensedTypeformModal />
                <Toaster />
              </div>
            </Router>
          </TypeformProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
