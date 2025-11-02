export type CocktailAPI = {
  idDrink: string;
  strDrink: string;
  strCategory: string | null;
  strAlcoholic: string | null;
  strDrinkThumb: string | null;
  strInstructions: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export type Ingredient = {
  name: string;
  measure?: string;
};

export type Cocktail = {
  id: string;
  name: string;
  category?: string;
  alcoholic?: string;
  image?: string;
  instructions?: string;
  ingredients: Ingredient[];
};
