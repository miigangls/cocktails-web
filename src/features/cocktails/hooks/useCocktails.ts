import { useQuery } from '@tanstack/react-query';
import { searchCocktailsByName, getCocktailById, listCategories, getCocktailsByCategory, fetchInitialCocktails } from '../api/cocktails.service';
import type { Cocktail } from '../types';

export const cocktailsKeys = {
  search: (query: string) => ['cocktails', 'search', query] as const,
  detail: (id: string) => ['cocktails', 'detail', id] as const,
  categories: ['cocktails', 'categories'] as const,
  byCategory: (category: string) => ['cocktails', 'category', category] as const,
  initial: (limit: number) => ['cocktails', 'initial', limit] as const,
};

export function useSearchCocktails(query: string) {
  return useQuery({
    queryKey: cocktailsKeys.search(query),
    queryFn: () => searchCocktailsByName(query),
    enabled: Boolean(query?.trim()),
  });
}

export function useCocktailDetail(id: string) {
  return useQuery<Cocktail | null>({
    queryKey: cocktailsKeys.detail(id),
    queryFn: () => getCocktailById(id),
    enabled: Boolean(id),
  });
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: cocktailsKeys.categories,
    queryFn: () => listCategories(),
  });
}

export function useCocktailsByCategory(category: string) {
  return useQuery<Cocktail[]>({
    queryKey: cocktailsKeys.byCategory(category),
    queryFn: () => getCocktailsByCategory(category),
    enabled: Boolean(category?.trim()),
  });
}

export function useInitialCocktails(limit = 100) {
  return useQuery<Cocktail[]>({
    queryKey: cocktailsKeys.initial(limit),
    queryFn: () => fetchInitialCocktails(limit),
  });
}
