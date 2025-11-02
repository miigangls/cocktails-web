import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import CocktailListPage from '../pages/CocktailListPage';
import CocktailDetailPage from '../pages/CocktailDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cocktails', element: <CocktailListPage /> },
      { path: 'cocktails/:id', element: <CocktailDetailPage /> },
    ],
  },
]);
