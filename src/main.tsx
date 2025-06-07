
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './types/unity.d.ts';

// Enable React StrictMode for better development warnings
const root = createRoot(document.getElementById("root")!);

if (import.meta.hot) {
  // Enable HMR for better development experience
  import.meta.hot.accept();
}

root.render(<App />);
