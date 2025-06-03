
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryWrapper extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary details:', { error, errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md p-8">
            <h2 className="text-2xl font-light mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">An error occurred while loading this component.</p>
            <div className="bg-gray-900 p-4 rounded-lg text-sm text-left">
              <pre className="text-red-400 whitespace-pre-wrap">
                {this.state.error?.message || 'Unknown error'}
              </pre>
            </div>
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;
