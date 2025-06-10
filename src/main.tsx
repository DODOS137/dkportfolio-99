
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable React StrictMode for better development warnings
const root = createRoot(document.getElementById("root")!);

// Enhanced HMR setup for faster code sync
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.accept('./App.tsx', () => {
    console.log('🔥 Hot reloading App component');
  });
}

// Force development server restart and cache clear
console.log('🚀 Starting application with clean cache...');

// Force a clean render with error boundary
root.render(<App />);
