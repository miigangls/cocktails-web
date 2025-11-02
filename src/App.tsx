import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="flex items-center justify-between py-6">
        <Link to="/" className="text-xl font-semibold">
          Cocktails
        </Link>
        <nav className="flex items-center gap-4">
          <Link className="text-sm text-gray-600 hover:text-gray-900" to="/">
            Explorar
          </Link>
        </nav>
      </header>
      <main className="pb-16">
        <Outlet />
      </main>
    </div>
  );
}
