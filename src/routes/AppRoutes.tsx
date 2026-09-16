import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: '3rem', fontFamily: 'sans-serif', textAlign: 'center', color: '#333' }}>
              <h1>🚀 Projeto Hub 3D</h1>
              <p>O ambiente React + Supabase está pronto!</p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}