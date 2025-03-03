
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Método mais eficiente para montagem do React
createRoot(document.getElementById("root")!).render(<App />);
