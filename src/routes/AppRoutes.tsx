import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Viewer3D } from '../components/Viewer3D';
import { Auth } from '../pages/Auth';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute><Viewer3D /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
