import { z } from "@hono/zod-openapi";

import { PaginationMetaSchema, PaginationQuerySchema } from "~/api/schemas";

import { HouseholdSchema } from "./households";
import { MeterReadingCreateSchema, MeterReadingWithTariffZoneSchema } from "./meter-readings";
import { ProviderSchema } from "./providers";

export const PaymentListQuerySchema = PaginationQuerySchema.extend({
  providerId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  tariffId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  householdId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
  isPaid: z
    .union([z.literal("true").transform(() => true), z.literal("false").transform(() => false), z.boolean()])
    .optional()
    .openapi({ example: true }),
}).openapi("ListPaymentsQuery");

export const PaymentSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    householdId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    providerId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    tariffId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    amount: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{2})?$/)
      .openapi({ example: "10.00" }),
    paidAmount: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{2})?$/)
      .openapi({ example: "10.00" }),
    paymentPeriod: z.iso.date().openapi({ example: "2023-01-01" }),
    description: z
      .string()
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "Description" }),
    isPaid: z.boolean().openapi({ example: true }),
    createdAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  })
  .openapi("Payment");

export const PaymentWithRelationsSchema = PaymentSchema.extend({
  household: HouseholdSchema,
  provider: ProviderSchema,
  meterReadings: z.array(MeterReadingWithTariffZoneSchema),
}).openapi("PaymentWithRelations");

export const PaymentsListSchema = z
  .object({
    items: z.array(PaymentWithRelationsSchema),
    meta: PaginationMetaSchema,
  })
  .openapi("PaymentsList");

export const PaymentCreateSchema = PaymentSchema.pick({
  householdId: true,
  providerId: true,
  paymentPeriod: true,
  description: true,
  isPaid: true,
})
  .extend({
    amount: z
      .union([z.string().regex(/^[0-9]+(\.[0-9]{2})?$/), z.literal("")])
      .nullable()
      .transform((v) => (v?.trim() ? v.trim() : null))
      .openapi({ example: "10.00" }),
    paidAmount: z
      .union([z.string().regex(/^[0-9]+(\.[0-9]{2})?$/), z.literal("")])
      .nullable()
      .transform((v) => (v?.trim() ? v.trim() : null))
      .openapi({ example: "10.00" }),
    meterReadings: z.array(MeterReadingCreateSchema).min(1).optional(),
  })
  .openapi("PaymentCreate");

export const PaymentMarkAsPaidSchema = PaymentSchema.pick({ paidAmount: true }).openapi("PaymentMarkAsPaid");
