import type { HouseholdCreateData, HouseholdUpdateData } from "~/types/households";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";

export const fetchHouseholdsKey = () => ["households"];

export const useHouseholds = () => {
  return useQuery({
    queryKey: fetchHouseholdsKey(),
    queryFn: async () => {
      const res = await api.households.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch households");
      }

      return res.json();
    },
  });
};

export const useHousehold = (id: string) => {
  return useQuery({
    queryKey: [...fetchHouseholdsKey(), { id }],
    queryFn: async () => {
      const res = await api.households[":id"].$get({ param: { id } });

      if (res.status === 404) {
        throw new Error("Household not found");
      }

      if (res.status === 422) {
        throw new Error("Incorrect household ID");
      }

      if (!res.ok) {
        throw new Error("Failed to fetch household");
      }

      return res.json();
    },
  });
};

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HouseholdCreateData) => {
      const res = await api.households.$post({ json: data });

      if (res.status === 422) {
        const data = await res.json();
        // todo: format error message
        console.warn(data.error);
        throw new Error("Failed to create household: validation failed");
      }

      if (!res.ok) {
        throw new Error("Failed to create household");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchHouseholdsKey() });
    },
  });
};

export const useUpdateHousehold = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HouseholdUpdateData) => {
      const res = await api.households[":id"].$patch({ param: { id }, json: data });

      if (res.status === 404) {
        throw new Error("Household not found");
      }

      if (res.status === 422) {
        const data = await res.json();
        // todo: format error message
        console.warn(data.error);
        throw new Error("Failed to update household: validation failed");
      }

      if (!res.ok) {
        throw new Error("Failed to update household");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchHouseholdsKey() });
    },
  });
};

export const useDeleteHousehold = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.households[":id"].$delete({ param: { id } });

      if (res.status === 404) {
        throw new Error("Household not found");
      }

      if (!res.ok) {
        throw new Error("Failed to delete household");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchHouseholdsKey(), exact: true });
    },
  });
};
