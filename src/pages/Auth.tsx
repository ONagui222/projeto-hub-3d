import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Auth() {
  const { session } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (session) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '380px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#60a5fa' }}>🚀 Hub 3D</h1>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta para começar'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ background: '#ef444420', color: '#f87171', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', border: '1px solid #ef444440' }}>
              {error}
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', boxSizing: 'border-box' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#2563eb', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', fontWeight: 'bold', fontSize: '0.95rem' }}
          >
            {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ width: '100%', background: 'none', border: 'none', color: '#94a3b8', marginTop: '1.2rem', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
        </button>
      </div>
    </div>
  );
}
