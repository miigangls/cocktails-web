import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCocktailDetail } from '../features/cocktails/hooks/useCocktails';
import EmptyState from '../components/EmptyState';

export default function CocktailDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCocktailDetail(id);

  function onClose() {
    navigate(-1);
  }

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-y-0 right-0 ml-auto flex h-full w-full max-w-full transform bg-white shadow-xl transition md:w-[480px]"
      >
        <div className="flex w-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Detalle del cóctel</h2>
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Cerrar panel"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-1">
                <div className="h-56 w-full animate-pulse rounded bg-gray-100" />
                <div className="space-y-3">
                  <div className="h-5 w-1/2 animate-pulse rounded bg-gray-100" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-24 w-full animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ) : isError ? (
              <EmptyState title="Error al cargar" description={(error as any)?.message ?? ''} />
            ) : !data ? (
              <EmptyState title="No encontrado" description="El cóctel no existe." />
            ) : (
              <div className="space-y-6">
                {data.image ? (
                  <img src={data.image} alt={data.name} className="w-full rounded-lg object-cover" />
                ) : (
                  <div className="h-56 w-full rounded bg-gray-100" />
                )}

                <div>
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <p className="mt-1 text-gray-600">
                    {data.category ?? 'Sin categoría'} · {data.alcoholic ?? 'Desconocido'}
                  </p>
                </div>

                {data.instructions && (
                  <div>
                    <h2 className="font-semibold">Instrucciones</h2>
                    <p className="mt-2 whitespace-pre-line text-gray-700">{data.instructions}</p>
                  </div>
                )}

                {data.ingredients.length > 0 && (
                  <div>
                    <h2 className="font-semibold">Ingredientes</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                      {data.ingredients.map((ing: { name: string; measure?: string }, idx: number) => (
                        <li key={idx}>
                          {ing.name}
                          {" "}
                          {ing.measure ? <span className="text-gray-500">— {ing.measure}</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
