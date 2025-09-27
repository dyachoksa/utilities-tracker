import { index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { id, timestamps } from "./common";
import { payments } from "./payments";
import { providers } from "./providers";
import { tariffZones } from "./tariffs";

export const meterReadings = pgTable(
  "meter_readings",
  {
    id: id(),
    providerId: uuid()
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    tariffZoneId: uuid()
      .notNull()
      .references(() => tariffZones.id, { onDelete: "cascade" }),
    paymentId: uuid().references(() => payments.id, { onDelete: "cascade" }),
    // Previous value of the meter. Usually, will be prepopulated from the previous reading.
    previousValue: integer().notNull(),
    // Current value of the meter.
    currentValue: integer().notNull(),
    description: text(),

    ...timestamps(),
  },
  (t) => [
    index("idx_meter_readings_provider_id").on(t.providerId),
    index("idx_meter_readings_tariff_zone_id").on(t.tariffZoneId),
    index("idx_meter_readings_by_date").on(t.createdAt.desc()),
  ]
);
