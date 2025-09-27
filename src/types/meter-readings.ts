import type {
  MeterReadingCreateSchema,
  MeterReadingSchema,
  MeterReadingWithTariffZoneSchema,
} from "~/schemas/meter-readings";

import { z } from "@hono/zod-openapi";

export type MeterReading = z.infer<typeof MeterReadingSchema>;

export type MeterReadingCreateData = z.infer<typeof MeterReadingCreateSchema>;

export type MeterReadingWithTariffZone = z.infer<typeof MeterReadingWithTariffZoneSchema>;
