import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 import this
import './index.css';
import App from './App.jsx';
import 'leaflet/dist/leaflet.css';
import { AppProvider } from './components/contexts/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
