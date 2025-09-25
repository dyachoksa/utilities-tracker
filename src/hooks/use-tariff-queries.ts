import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { TariffCreateData, TariffUpdateData } from "~/types/tariffs";

export const fetchTariffsKey = (providerId: string) => ["tariffs", { providerId }];

export const useTariffs = (providerId: string) => {
  return useQuery({
    queryKey: fetchTariffsKey(providerId),
    queryFn: async () => {
      const res = await api.tariffs.$get({ query: { providerId } });

      if (!res.ok) {
        throw new Error("Failed to fetch tariffs");
      }

      return res.json();
    },
  });
};

export const useCreateTariff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TariffCreateData) => {
      const res = await api.tariffs.$post({ json: data });

      if (!res.ok) {
        throw new Error("Failed to create tariff");
      }

      return res.json();
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: fetchTariffsKey(data.providerId) });
    },
  });
};

export const useUpdateTariff = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TariffUpdateData) => {
      const res = await api.tariffs[":id"].$patch({ param: { id }, json: data });

      if (res.status === 404) {
        throw new Error("Tariff not found");
      }

      if (res.status === 422) {
        throw new Error("Validation error. Bad tariff ID or tariff data.");
      }

      if (!res.ok) {
        throw new Error("Failed to update tariff");
      }

      return res.json();
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: fetchTariffsKey(data.providerId) });
    },
  });
};

export const useDeleteTariff = (id: string, providerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.tariffs[":id"].$delete({ param: { id } });

      if (res.status === 404) {
        throw new Error("Tariff not found");
      }

      if (res.status === 422) {
        throw new Error("Incorrect tariff ID");
      }

      if (!res.ok) {
        throw new Error("Failed to delete tariff");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchTariffsKey(providerId) });
    },
  });
};
