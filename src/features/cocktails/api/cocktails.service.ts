import { http } from '../../../lib/axios';
import type { CocktailAPI, Cocktail, Ingredient } from '../types';

function mapCocktail(api: CocktailAPI): Cocktail {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 15; i += 1) {
    const name = api[`strIngredient${i}`];
    const measure = api[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() || undefined });
    }
  }
  return {
    id: api.idDrink,
    name: api.strDrink,
    category: api.strCategory ?? undefined,
    alcoholic: api.strAlcoholic ?? undefined,
    image: api.strDrinkThumb ?? undefined,
    instructions: api.strInstructions ?? undefined,
    ingredients,
  };
}

export async function searchCocktailsByName(query: string): Promise<Cocktail[]> {
  if (!query?.trim()) return [];
  const { data } = await http.get<{ drinks: CocktailAPI[] | null }>('search.php', {
    params: { s: query.trim() },
  });
  return (data.drinks ?? []).map(mapCocktail);
}

export async function getCocktailById(id: string): Promise<Cocktail | null> {
  const { data } = await http.get<{ drinks: CocktailAPI[] | null }>('lookup.php', {
    params: { i: id },
  });
  const first = data.drinks?.[0];
  return first ? mapCocktail(first) : null;
}

export async function listCategories(): Promise<string[]> {
  const { data } = await http.get<{ drinks: { strCategory: string }[] | null }>('list.php', {
    params: { c: 'list' },
  });
  return (data.drinks ?? []).map((d) => d.strCategory).filter(Boolean);
}

export async function getCocktailsByCategory(category: string): Promise<Cocktail[]> {
  if (!category?.trim()) return [];
  const { data } = await http.get<{ drinks: { idDrink: string; strDrink: string; strDrinkThumb: string | null }[] | null }>('filter.php', {
    params: { c: category },
  });
  return (data.drinks ?? []).map((d) => ({
    id: d.idDrink,
    name: d.strDrink,
    image: d.strDrinkThumb ?? undefined,
    category,
    alcoholic: undefined,
    instructions: undefined,
    ingredients: [],
  }));
}

export async function fetchInitialCocktails(limit = 100): Promise<Cocktail[]> {
  const categories = await listCategories();
  // Fetch a handful of categories to accumulate ~limit items
  const batch = categories.slice(0, 8);
  const lists = await Promise.all(batch.map((c) => getCocktailsByCategory(c)));
  const merged = lists.flat();
  const seen = new Set<string>();
  const deduped: Cocktail[] = [];
  for (const c of merged) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      deduped.push(c);
      if (deduped.length >= limit) break;
    }
  }
  return deduped.slice(0, limit);
}
