import type { PaymentsByMonthsQuery } from "~/types/stats";

import { useQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

export const fetchPaymentTotalsKey = () => ["stats", { sub: "payment-totals" }];

export const usePaymentTotals = () => {
  return useQuery({
    queryKey: fetchPaymentTotalsKey(),
    queryFn: async () => {
      const res = await api.stats["payment-totals"].$get({ query: {} });

      if (!res.ok) {
        throw new Error("Failed to fetch payment totals");
      }

      return res.json();
    },
  });
};

export const fetchPaymentsByTypeKey = () => ["stats", { sub: "payments-by-type" }];

export const usePaymentsByType = () => {
  return useQuery({
    queryKey: fetchPaymentsByTypeKey(),
    queryFn: async () => {
      // todo: add query params if needed later
      const res = await api.stats["payments-by-type"].$get({ query: {} });

      if (!res.ok) {
        throw new Error("Failed to fetch payments by type");
      }

      return res.json();
    },
  });
};

export const fetchPaymentsByMonthsKey = (params: PaymentsByMonthsQuery) => [
  "stats",
  { sub: "payments-by-months", ...params },
];

export const usePaymentsByMonths = (params: PaymentsByMonthsQuery) => {
  return useQuery({
    queryKey: fetchPaymentsByMonthsKey(params),
    queryFn: async () => {
      const res = await api.stats["payments-by-months"].$get({ query: params });

      if (!res.ok) {
        throw new Error("Failed to fetch payments by months");
      }

      return res.json();
    },
  });
};
