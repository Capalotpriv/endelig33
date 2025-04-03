import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { monitorLCP, setupLazyLoading } from './lib/performance'

// Create the root and render the app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Setup performance monitoring in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    // Monitor LCP to identify critical elements
    monitorLCP();
    
    // Setup lazy loading for images with data-src attribute
    setTimeout(() => {
      setupLazyLoading();
    }, 1000);
  });
}
