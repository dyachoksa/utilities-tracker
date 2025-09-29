import { useQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";
import { PaymentsByMonthsQuery } from "~/types/stats";

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
