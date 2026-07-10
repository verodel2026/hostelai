import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Se ejecuta SOLO durante el build (npm run build).
// Genera el HTML completo de la página para que Google y las IA
// puedan leer el contenido sin ejecutar JavaScript.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
