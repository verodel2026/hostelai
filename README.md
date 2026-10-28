# HostelAI

Web de [HostelAI](https://www.hostelai.es): gestión de reseñas de Google y posicionamiento en Google Business Profile para bares, cafeterías y restaurantes del área de A Coruña.

## Qué hay

- **Página principal**: React + Vite + Tailwind (`src/`). Los textos están en `src/constants.ts`.
- **Páginas estáticas** (guías, páginas por zona y `/manual-resenas`): HTML en `public/<página>/index.html`.

## Cómo se construye

Necesitas Node.js.

```bash
npm install
npm run dev     # servidor local en http://localhost:3000
npm run lint    # comprobación de tipos
npm run build   # genera dist/ con la página principal pre-renderizada
```

`npm run build` compila la web y pre-renderiza la página principal en `dist/index.html`, para que Google y los asistentes de IA lean el contenido sin ejecutar JavaScript.

## Publicar

Hacer `git push` a `main`: Vercel despliega automáticamente.
