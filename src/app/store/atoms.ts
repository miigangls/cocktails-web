import { atom } from 'jotai';

export const searchQueryAtom = atom<string>('');
export const themeAtom = atom<'light' | 'dark'>('light');
