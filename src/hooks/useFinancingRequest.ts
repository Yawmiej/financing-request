import { useMutation } from "@tanstack/react-query";

export const useFinancingRequest = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("http://test-noema-api.azurewebsites.net/api/requests", {
        method: "POST",
        body: JSON.stringify(data),
      });

      return response.json();
    },
  });
};
