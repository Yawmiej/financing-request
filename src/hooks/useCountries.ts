import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { OPEC_COUNTRIES } from "@/config/const";

interface CountryResponse {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  cca2: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
  isOPEC: boolean;
}

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: queryKeys.countries(),
    queryFn: async () => {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2");

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const result = (await response.json()) as CountryResponse[];

      return result
        .map((country) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg,
          isOPEC: OPEC_COUNTRIES.includes(country.name.common),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });
};
