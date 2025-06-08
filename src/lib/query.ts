import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const queryKeys = {
  countries: () => ["countries"],
  currency: () => ["currency"],
} as const;
