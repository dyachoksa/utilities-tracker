import { z } from "@hono/zod-openapi";

import { providerTypes } from "~/constants";

export const PaymentTotalsSchema = z
  .object({
    amount: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{2})?$/)
      .openapi({ example: "100.00" }),
    paidAmount: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{2})?$/)
      .openapi({ example: "100.00" }),
  })
  .openapi("PaymentTotals");

export const PaymentsByTypeQuerySchema = z
  .object({
    period: z.iso.date().optional().openapi({
      example: "2025-09-29",
      description: "Period of payments (any date from month, usually last day of month)",
    }),
  })
  .openapi("PaymentByTypeQuery");

export const PaymentsByTypeValueSchema = z
  .object({
    providerType: z.enum(providerTypes),
    amount: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{2})?$/)
      .openapi({ example: "100.00" }),
  })
  .openapi("PaymentsByTypeValue");

export const PaymentsByTypeSchema = z
  .object({
    values: z.array(PaymentsByTypeValueSchema),
    period: z.iso.date().openapi({
      example: "2025-09-29",
      description: "Period of payments (any date from month, usually last day of month)",
    }),
  })
  .openapi("PaymentsByType");

export const PaymentsByMonthsQuerySchema = z
  .object({
    householdId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    providerId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  })
  .openapi("PaymentByMonthsQuery");

export const PaymentsByMonthsSchema = z
  .array(
    z.object({
      period: z.iso.date().openapi({
        example: "2025-09-29",
        description: "Period of payments (any date from month, usually last day of month)",
      }),
      amount: z
        .string()
        .regex(/^[0-9]+(\.[0-9]{2})?$/)
        .openapi({ example: "100.00" }),
      paidAmount: z
        .string()
        .regex(/^[0-9]+(\.[0-9]{2})?$/)
        .openapi({ example: "100.00" }),
    })
  )
  .openapi("PaymentsByMonths");
