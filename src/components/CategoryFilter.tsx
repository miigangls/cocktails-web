import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../features/cocktails/hooks/useCocktails';

export default function CategoryFilter() {
  const { data: categories = [], isLoading } = useCategories();
  const [params, setParams] = useSearchParams();

  const value = params.get('category') ?? '';

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = new URLSearchParams(params.toString());
    const v = e.target.value;
    if (v) next.set('category', v);
    else next.delete('category');
    setParams(next, { replace: true });
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category" className="text-sm text-gray-700">
        Categoría
      </label>
      <select
        id="category"
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={value}
        onChange={onChange}
        aria-busy={isLoading}
      >
        <option value="">Todas</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
