import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { ProviderCreateData, ProviderUpdateData } from "~/types/providers";

export type FetchProvidersParams = {
  householdId?: string;
  id?: string;
};

export const fetchProvidersKey = (params: FetchProvidersParams) => ["providers", params];

export const useProviders = (householdId?: string) => {
  return useQuery({
    queryKey: fetchProvidersKey({ householdId }),
    queryFn: async () => {
      const res = await api.providers.$get({ query: { householdId } });

      if (!res.ok) {
        throw new Error("Failed to fetch providers");
      }

      return res.json();
    },
  });
};

export const useProvider = (id: string) => {
  return useQuery({
    queryKey: fetchProvidersKey({ id }),
    queryFn: async () => {
      const res = await api.providers[":id"].$get({ param: { id } });

      if (res.status === 404) {
        throw new Error("Provider not found");
      }

      if (res.status === 422) {
        throw new Error("Incorrect provider ID");
      }

      if (!res.ok) {
        throw new Error("Failed to fetch provider");
      }

      return res.json();
    },
  });
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProviderCreateData) => {
      const res = await api.providers.$post({ json: data });

      if (res.status === 422) {
        const data = await res.json();
        // todo: format error message
        console.warn(data.error);
        throw new Error("Failed to create provider: validation failed");
      }

      if (!res.ok) {
        throw new Error("Failed to create provider");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchProvidersKey({}) });
    },
  });
};

export const useUpdateProvider = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProviderUpdateData) => {
      const res = await api.providers[":id"].$patch({ param: { id }, json: data });

      if (res.status === 404) {
        throw new Error("Provider not found");
      }

      if (res.status === 422) {
        throw new Error("Incorrect provider ID");
      }

      if (!res.ok) {
        throw new Error("Failed to update provider");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchProvidersKey({}) });
    },
  });
};

export const useDeleteProvider = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.providers[":id"].$delete({ param: { id } });

      if (res.status === 404) {
        throw new Error("Provider not found");
      }

      if (!res.ok) {
        throw new Error("Failed to delete provider");
      }

      return res.json();
    },
  });
};
