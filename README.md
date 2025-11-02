# cocktails-web

Aplicación React (Vite + TypeScript) para buscar cócteles usando TheCocktailDB.

Inspirada en la idea del repositorio `miigangls/cocktails-web` ([GitHub](https://github.com/miigangls/cocktails-web)).

## Stack

- Vite + React 18 + TypeScript
- TailwindCSS (PostCSS/Autoprefixer)
- React Router v6
- Jotai (estado global ligero)
- React Query (@tanstack/react-query)
- Axios (con interceptor de errores)
- ESLint + Prettier

## Requisitos

- Node >= 18
- pnpm, npm o yarn

## Inicio rápido

```bash
# 1) Instalar dependencias
npm install

# 2) Variables de entorno
# (si no existe) crea el archivo .env y define VITE_API_URL
# Ejemplo:
# VITE_API_URL=https://www.thecocktaildb.com/api/json/v1/1

# 3) Desarrollo
npm run dev

# 4) Build
npm run build
npm run preview

# 5) Lint y formato
npm run lint
npm run format
```

## Variables de entorno

Archivo `.env` recomendado (basado en `.env.example`):

```
VITE_API_URL=https://www.thecocktaildb.com/api/json/v1/1
```

## Arquitectura y estructura

```
cocktails-web/
  ├─ .vscode/
  │   └─ settings.json
  ├─ src/
  │  ├─ app/
  │  │   ├─ router.tsx
  │  │   ├─ providers/
  │  │   │   ├─ QueryProvider.tsx
  │  │   │   └─ ThemeProvider.tsx
  │  │   └─ store/atoms.ts
  │  ├─ pages/
  │  │   ├─ HomePage.tsx
  │  │   ├─ CocktailListPage.tsx
  │  │   └─ CocktailDetailPage.tsx
  │  ├─ components/
  │  │   ├─ SearchBar.tsx
  │  │   ├─ CocktailCard.tsx
  │  │   └─ EmptyState.tsx
  │  ├─ features/cocktails/
  │  │   ├─ api/cocktails.service.ts
  │  │   ├─ hooks/useCocktails.ts
  │  │   └─ types.ts
  │  ├─ lib/
  │  │   ├─ axios.ts
  │  │   └─ env.ts
  │  ├─ styles/
  │  │   └─ tailwind.css
  │  ├─ assets/
  │  ├─ App.tsx
  │  └─ main.tsx
  ├─ public/
  ├─ index.html
  ├─ tsconfig.json
  ├─ vite.config.ts
  ├─ tailwind.config.ts
  ├─ postcss.config.js
  ├─ .eslintrc.cjs
  ├─ .prettierrc
  ├─ .gitignore
  └─ README.md
```

### Routing

- `/` → HomePage (buscador y CTA).
- `/cocktails` → CocktailListPage (lista con paginación/infinite scroll; query `?q=`).
- `/cocktails/:id` → CocktailDetailPage (detalle).

### React Query

- Provider central en `QueryProvider`.
- Keys: `['cocktails','search', query]` y `['cocktails','detail', id]`.

### Axios

- Cliente en `src/lib/axios.ts` con `baseURL` desde `VITE_API_URL`.
- Interceptor de respuesta para normalizar errores `{ message, status }` y logging en dev.

### Estado global (Jotai)

- `searchQueryAtom: string`
- `themeAtom: 'light' | 'dark'`

### UI

- TailwindCSS con layout responsive.
- Accesibilidad: labels, `aria-*`, estados de carga/vacío/error.

## Notas

- La API de búsqueda no es paginada; se implementa paginado/infinite scroll a nivel de UI con segmentación de resultados en el cliente.

## Licencia

MIT
