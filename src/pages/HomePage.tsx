import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '../app/store/atoms';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import CocktailCard from '../components/CocktailCard';
import EmptyState from '../components/EmptyState';
import { useSearchCocktails, useCocktailsByCategory, useInitialCocktails } from '../features/cocktails/hooks/useCocktails';

const PAGE_SIZE = 12;

export default function HomePage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const [, setSearch] = useAtom(searchQueryAtom);

  React.useEffect(() => {
    setSearch(q);
  }, [q, setSearch]);

  const initialQuery = useInitialCocktails(100);
  const searchQuery = useSearchCocktails(q);
  const categoryQuery = useCocktailsByCategory(category);

  const showInitial = !q && !category;

  const isLoading = showInitial
    ? initialQuery.isLoading
    : (q ? searchQuery.isLoading : false) || (category && !q ? categoryQuery.isLoading : false);

  const isError = showInitial
    ? initialQuery.isError
    : (q ? searchQuery.isError : false) || (category && !q ? categoryQuery.isError : false);

  const error = showInitial ? initialQuery.error : q ? searchQuery.error : categoryQuery.error;

  let items = showInitial
    ? initialQuery.data ?? []
    : q
    ? searchQuery.data ?? []
    : category
    ? categoryQuery.data ?? []
    : [];

  if (q && category && !showInitial) {
    items = (searchQuery.data ?? []).filter((c) => c.category === category);
  }

  const [visible, setVisible] = React.useState(PAGE_SIZE);
  React.useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [q, category, showInitial]);

  const hasMore = items.length > visible;

  return (
    <section className="mx-auto max-w-6xl py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-3xl font-bold tracking-tight">Busca tu cóctel favorito</h1>
        <p className="mt-3 text-center text-gray-600">
          Encuentra cócteles por nombre y filtra por categoría.
        </p>
        <div className="mt-8">
          <SearchBar />
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{showInitial ? 'Sugeridos' : 'Resultados'}</h2>
          <CategoryFilter />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border bg-white">
                <div className="h-48 w-full animate-pulse bg-gray-100" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <EmptyState title="Error al cargar" description={(error as any)?.message ?? ''} />
        ) : !items.length ? (
          <EmptyState title="Sin resultados" description="Ajusta tu búsqueda o categoría." />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, visible).map((c) => (
                <CocktailCard key={c.id} cocktail={c} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cargar más
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
