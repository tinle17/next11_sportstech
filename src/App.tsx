import React from "react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Landing from "./pages/Landing";
import ScoutDiscover from "./pages/ScoutDiscover";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: "player" | "scout" }) => {
  const { role } = useAuth();
  if (role !== requiredRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={role ? <Navigate to={role === "player" ? "/player/profile" : "/scout/discover"} replace /> : <Landing />} />
      <Route path="/player/profile" element={<ProtectedRoute requiredRole="player"><Placeholder title="Player Profile" /></ProtectedRoute>} />
      <Route path="/player/jobs" element={<ProtectedRoute requiredRole="player"><Placeholder title="Player Jobs" /></ProtectedRoute>} />
      <Route path="/player/events" element={<ProtectedRoute requiredRole="player"><Placeholder title="Player Events" /></ProtectedRoute>} />
      <Route path="/scout/discover" element={<ProtectedRoute requiredRole="scout"><ScoutDiscover /></ProtectedRoute>} />
      <Route path="/scout/saved" element={<ProtectedRoute requiredRole="scout"><Placeholder title="Saved Players" /></ProtectedRoute>} />
      <Route path="/scout/posts" element={<ProtectedRoute requiredRole="scout"><Placeholder title="Scout Posts" /></ProtectedRoute>} />
      <Route path="/scout/events" element={<ProtectedRoute requiredRole="scout"><Placeholder title="Scout Events" /></ProtectedRoute>} />
      <Route path="*" element={<Placeholder title="404 Not Found" />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" />
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
