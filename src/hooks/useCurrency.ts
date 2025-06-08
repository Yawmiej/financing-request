import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";

interface CurrencyResponse {
  [key: string]: string;
}

interface Currency {
  code: string;
  name: string;
}

export const useCurrency = () => {
  return useQuery<Currency[]>({
    queryKey: queryKeys.currency(),
    queryFn: async () => {
      const response = await fetch("https://openexchangerates.org/api/currencies.json");

      if (!response.ok) {
        throw new Error("Failed to fetch currencies");
      }

      const result = (await response.json()) as CurrencyResponse;

      return Object.entries(result)
        .map(([code, name]) => ({
          code,
          name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
};
