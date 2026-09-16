import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Viewer3D } from '../components/Viewer3D';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Viewer3D />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
