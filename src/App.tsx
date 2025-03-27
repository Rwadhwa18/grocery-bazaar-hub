
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerLogin from "./pages/auth/CustomerLogin";
import CustomerRegister from "./pages/auth/CustomerRegister";
import MerchantLogin from "./pages/auth/MerchantLogin";
import MerchantRegister from "./pages/auth/MerchantRegister";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import MerchantSetup from "./pages/merchant/MerchantSetup";
import MerchantDashboard from "./components/merchants/MerchantDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Customer Auth Routes */}
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          
          {/* Merchant Auth Routes */}
          <Route path="/merchant/login" element={<MerchantLogin />} />
          <Route path="/merchant/register" element={<MerchantRegister />} />
          <Route path="/merchant/setup" element={<MerchantSetup />} />
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          
          {/* Content Pages */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
