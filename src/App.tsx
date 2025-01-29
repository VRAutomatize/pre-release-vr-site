import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIAttendants from "./pages/services/AIAttendants";
import CRM from "./pages/services/CRM";
import Chatbots from "./pages/services/Chatbots";
import LeadCapture from "./pages/services/LeadCapture";
import Automation from "./pages/services/Automation";
import Consulting from "./pages/services/Consulting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/ai-attendants" element={<AIAttendants />} />
          <Route path="/services/crm" element={<CRM />} />
          <Route path="/services/chatbots" element={<Chatbots />} />
          <Route path="/services/lead-capture" element={<LeadCapture />} />
          <Route path="/services/automation" element={<Automation />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;