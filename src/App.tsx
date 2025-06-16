
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "@/contexts/SiteContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Emails from "./pages/Emails";
import Social from "./pages/Social";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Deploy from "./pages/Deploy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteProvider>
        <SidebarProvider>
          <BrowserRouter>
            <div className="min-h-screen flex w-full bg-gray-50">
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/emails" element={<Emails />} />
                  <Route path="/social" element={<Social />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/deploy" element={<Deploy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            </div>
          </BrowserRouter>
        </SidebarProvider>
      </SiteProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
