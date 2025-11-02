import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { router } from './app/router';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
