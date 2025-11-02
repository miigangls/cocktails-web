export const getEnv = () => {
  const baseUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
  return {
    apiBaseUrl: baseUrl ?? 'https://www.thecocktaildb.com/api/json/v1/1',
    isDev: Boolean((import.meta as any).env?.DEV),
  };
};
