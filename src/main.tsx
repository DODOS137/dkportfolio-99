
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './types/unity.d.ts';

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
