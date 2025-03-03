
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// You must add VITE_CLERK_PUBLISHABLE_KEY to your .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY';

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'pk_test_REPLACE_WITH_YOUR_KEY') {
  console.warn("Missing Clerk Publishable Key - Replace with your key in .env file");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);
