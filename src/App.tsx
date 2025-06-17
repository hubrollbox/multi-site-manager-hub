
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "@/contexts/SiteContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import Emails from "./pages/Emails";
import Social from "./pages/Social";
import Database from "./pages/Database";
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
      <AuthProvider>
        <SiteProvider>
          <SidebarProvider>
            <BrowserRouter>
              <div className="min-h-screen flex w-full bg-gray-50">
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/*" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/projects" element={<Projects />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/emails" element={<Emails />} />
                          <Route path="/social" element={<Social />} />
                          <Route path="/database" element={<Database />} />
                          <Route path="/tasks" element={<Tasks />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/deploy" element={<Deploy />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </SidebarProvider>
        </SiteProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
