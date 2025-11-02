import React from 'react';
import { Link } from 'react-router-dom';
import type { Cocktail } from '../features/cocktails/types';

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Link
      to={`/cocktails/${cocktail.id}`}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
      aria-label={`Ver detalle de ${cocktail.name}`}
    >
      {cocktail.image ? (
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="h-48 w-full object-cover transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="h-48 w-full animate-pulse bg-gray-100" />
      )}
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold">{cocktail.name}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {cocktail.category ?? 'Sin categoría'} · {cocktail.alcoholic ?? 'Desconocido'}
        </p>
      </div>
    </Link>
  );
}
