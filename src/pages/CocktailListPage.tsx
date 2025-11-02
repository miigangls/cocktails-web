import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '../app/store/atoms';
import { useSearchCocktails, useCocktailsByCategory } from '../features/cocktails/hooks/useCocktails';
import CocktailCard from '../components/CocktailCard';
import EmptyState from '../components/EmptyState';
import CategoryFilter from '../components/CategoryFilter';

const PAGE_SIZE = 12;

export default function CocktailListPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const [, setSearch] = useAtom(searchQueryAtom);

  React.useEffect(() => {
    setSearch(q);
  }, [q, setSearch]);

  const searchQuery = useSearchCocktails(q);
  const categoryQuery = useCocktailsByCategory(category);

  const isLoading = (q ? searchQuery.isLoading : false) || (category && !q ? categoryQuery.isLoading : false);
  const isError = (q ? searchQuery.isError : false) || (category && !q ? categoryQuery.isError : false);
  const error = q ? searchQuery.error : categoryQuery.error;

  let items = q ? searchQuery.data ?? [] : category ? categoryQuery.data ?? [] : [];
  // If both q and category are present, filter search results by category client-side
  if (q && category) {
    items = (searchQuery.data ?? []).filter((c) => c.category === category);
  }

  const [visible, setVisible] = React.useState(PAGE_SIZE);
  React.useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [q, category]);

  const hasMore = items.length > visible;

  if (!q && !category) {
    return (
      <section className="py-8">
        <EmptyState title="Escribe algo o elige una categoría" description="Usa la búsqueda o el filtro de categoría." />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resultados</h2>
          <CategoryFilter />
        </div>
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
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resultados</h2>
          <CategoryFilter />
        </div>
        <EmptyState title="Error al cargar" description={(error as any)?.message ?? ''} />
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Resultados</h2>
          <CategoryFilter />
        </div>
        <EmptyState title="Sin resultados" description="Ajusta tu búsqueda o categoría." />
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg text-gray-700">
          {q ? (
            <>Resultados para: <span className="font-semibold">{q}</span></>
          ) : (
            <>Categoría: <span className="font-semibold">{category}</span></>
          )}{' '}
          (<span className="font-semibold">{items.length}</span>)
        </h2>
        <CategoryFilter />
      </div>

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
    </section>
  );
}
