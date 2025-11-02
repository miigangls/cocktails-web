import React from 'react';

export default function EmptyState({
  title = 'Sin resultados',
  description = 'Intenta ajustar tu búsqueda.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
