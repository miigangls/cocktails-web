import React from 'react';
import { useAtom } from 'jotai';
import { themeAtom } from '../store/atoms';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useAtom(themeAtom);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return children as React.ReactElement;
}
