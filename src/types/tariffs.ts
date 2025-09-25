import type {
  TariffCreateSchema,
  TariffSchema,
  TariffUpdateSchema,
  TariffZoneCreateSchema,
  TariffZoneSchema,
} from "~/schemas/tariffs";

import { z } from "@hono/zod-openapi";

export type TariffZone = z.infer<typeof TariffZoneSchema>;

export type TariffZoneCreateData = z.infer<typeof TariffZoneCreateSchema>;

export type Tariff = z.infer<typeof TariffSchema>;

export type TariffCreateData = z.infer<typeof TariffCreateSchema>;

export type TariffUpdateData = z.infer<typeof TariffUpdateSchema>;
