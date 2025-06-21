
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

// Import all pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Calendar from "./pages/Calendar";
import Social from "./pages/Social";
import Database from "./pages/Database";
import Deploy from "./pages/Deploy";
import Emails from "./pages/Emails";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProjectSettings from "./pages/ProjectSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProjectProvider>
            <SidebarProvider>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Dashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Projects />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/project-settings" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <ProjectSettings />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tasks" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Tasks />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/users" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Users />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/calendar" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Calendar />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/social" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Social />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/database" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Database />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/deploy" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Deploy />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/emails" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Emails />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Settings />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Profile />
                      </AppLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarProvider>
          </ProjectProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </TooltipProvider>
);

export default App;
