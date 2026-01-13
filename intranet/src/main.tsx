import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Simple authentication check
const checkAuth = () => {
  const stored = sessionStorage.getItem('vantage_auth');
  if (stored === 'authenticated') {
    return true;
  }

  const password = prompt('Ingresa la contraseña de acceso:');

  // Password: vantage2024
  if (password === 'vantage2024') {
    sessionStorage.setItem('vantage_auth', 'authenticated');
    return true;
  }

  alert('Contraseña incorrecta. Acceso denegado.');
  return false;
};

// Check authentication before rendering
if (checkAuth()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  // Show access denied message
  document.body.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: system-ui, -apple-system, sans-serif;
      color: white;
    ">
      <div style="text-align: center;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">🔒 Acceso Denegado</h1>
        <p style="font-size: 1.2rem;">Esta es un área restringida de Vantage Tech Labs</p>
        <button 
          onclick="location.reload()" 
          style="
            margin-top: 2rem;
            padding: 1rem 2rem;
            font-size: 1rem;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          "
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  `;
}
