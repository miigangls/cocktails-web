import React from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { searchQueryAtom } from '../app/store/atoms';

export default function SearchBar() {
  const [value, setValue] = useAtom(searchQueryAtom);
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} aria-label="Buscar cócteles" className="w-full">
      <label htmlFor="search" className="sr-only">
        Buscar cócteles
      </label>
      <div className="flex items-center gap-2">
        <input
          id="search"
          name="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Margarita, Mojito, Negroni…"
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base outline-none ring-0 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          aria-describedby="search-help"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Buscar"
        >
          Buscar
        </button>
      </div>
      <p id="search-help" className="mt-2 text-sm text-gray-500">
        Escribe el nombre del cóctel y presiona Enter.
      </p>
    </form>
  );
}
