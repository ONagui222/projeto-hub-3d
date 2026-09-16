import { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro React:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#0f172a', color: '#ef4444', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2>⚠️ Ocorreu um erro ao carregar a tela:</h2>
          <pre style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', color: '#f87171', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <p style={{ color: '#94a3b8' }}>Tire um print ou me diga o que está escrito acima.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
