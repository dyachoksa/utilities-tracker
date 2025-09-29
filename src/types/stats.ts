import type {
  PaymentsByMonthsQuerySchema,
  PaymentsByMonthsSchema,
  PaymentsByTypeQuerySchema,
  PaymentsByTypeSchema,
  PaymentsByTypeValueSchema,
} from "~/schemas/stats";

import { z } from "@hono/zod-openapi";

export type PaymentsByTypeQuery = z.infer<typeof PaymentsByTypeQuerySchema>;
export type PaymentsByTypeValue = z.infer<typeof PaymentsByTypeValueSchema>;
export type PaymentsByType = z.infer<typeof PaymentsByTypeSchema>;

export type PaymentsByMonthsQuery = z.infer<typeof PaymentsByMonthsQuerySchema>;
export type PaymentsByMonths = z.infer<typeof PaymentsByMonthsSchema>;
