import type { PaymentCreateData, PaymentMarkAsPaidData } from "~/types/payments";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "~/lib/api";

export type FetchPaymentsParams = {
  page: number;
  perPage: number;
  householdId?: string;
  providerId?: string;
};

export const fetchPaymentsKey = (params: FetchPaymentsParams) => ["payments", params];

export const usePayments = (params: FetchPaymentsParams) => {
  return useQuery({
    queryKey: fetchPaymentsKey(params),
    queryFn: async () => {
      const res = await api.payments.$get({ query: params });

      if (!res.ok) {
        throw new Error("Failed to fetch payments");
      }

      return res.json();
    },
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PaymentCreateData) => {
      const res = await api.payments.$post({ json: data });

      if (res.status === 422) {
        const data = await res.json();
        // todo: format error message
        console.warn(data.error);
        throw new Error("Failed to create payment: validation failed");
      }

      if (!res.ok) {
        throw new Error("Failed to create payment");
      }

      return res.json();
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["payments"] }),
        queryClient.invalidateQueries({ queryKey: ["meter-readings", { tariffId: data.tariffId }] }),
      ]);
    },
  });
};

export const useMarkPaymentAsPaid = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PaymentMarkAsPaidData) => {
      const res = await api.payments[":id"]["mark-as-paid"].$post({ param: { id }, json: data });

      if (res.status === 404) {
        throw new Error("Payment not found");
      }

      if (!res.ok) {
        throw new Error("Failed to mark payment as paid");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useDeletePayment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.payments[":id"].$delete({ param: { id } });

      if (res.status === 404) {
        throw new Error("Payment not found");
      }

      if (!res.ok) {
        throw new Error("Failed to delete payment");
      }

      return;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};
