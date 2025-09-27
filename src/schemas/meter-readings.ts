import { z } from "@hono/zod-openapi";

import { TariffZoneSchema } from "./tariffs";

export const MeterReadingSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    providerId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    tariffZoneId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    previousValue: z.coerce.number().openapi({ example: 100 }),
    currentValue: z.coerce.number().openapi({ example: 200 }),
    description: z
      .string()
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "Description" }),
    createdAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  })
  .openapi("MeterReading");

export const MeterReadingWithTariffZoneSchema = MeterReadingSchema.extend({
  tariffZone: TariffZoneSchema,
});

export const MeterReadingCreateSchema = MeterReadingSchema.pick({
  tariffZoneId: true,
  previousValue: true,
  currentValue: true,
  description: true,
}).openapi("MeterReadingCreate");
