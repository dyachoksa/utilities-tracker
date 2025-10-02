import { z } from "@hono/zod-openapi";

import { tariffTypes } from "~/constants";

export const TariffZoneSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    tariffId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    name: z.string().openapi({ example: "Default monthly" }),
    price: z
      .string()
      .regex(/^[0-9]+(\.[0-9]{0,4})?$/)
      .openapi({ example: "10.00", description: "Monthly price" }),
    description: z
      .string()
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "Default tariff zone" }),
    createdAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  })
  .openapi("TariffZone");

export const TariffZoneCreateSchema = TariffZoneSchema.pick({ name: true, price: true, description: true }).openapi(
  "TariffZoneCreate"
);

export const TariffSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    providerId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    tariffType: z.enum(tariffTypes).openapi({ example: "counter-based" }),
    name: z.string().openapi({ example: "Default monthly" }),
    startDate: z.iso.date().openapi({ example: "2023-01-01" }),
    description: z
      .string()
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "Description" }),
    isActive: z.boolean().openapi({ example: true }),
    tariffZones: z.array(TariffZoneSchema),
    createdAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  })
  .openapi("Tariff");

export const TariffCreateSchema = TariffSchema.omit({ id: true, createdAt: true, updatedAt: true, tariffZones: true })
  .extend({ tariffZones: z.array(TariffZoneCreateSchema).min(1, { message: "At least one tariff zone is required" }) })
  .openapi("TariffCreate");

export const TariffUpdateSchema = TariffCreateSchema.partial().openapi("TariffUpdate");
