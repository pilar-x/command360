import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('COMMAND360 Error Boundary Caught:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-wide">
                TERJADI KENDALA TAMPILAN MODUL
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sistem COMMAND360 merekam kendala eksekusi script. Anda dapat memuat ulang komponen tanpa kehilangan data utama.
              </p>
            </div>

            {this.state.error && (
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-amber-400 text-left overflow-x-auto max-h-32">
                {this.state.error.message || 'Script error.'}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>MUAT ULANG APLIKASI</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
