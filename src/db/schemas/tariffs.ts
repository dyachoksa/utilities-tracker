import { boolean, date, decimal, index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { tariffTypes } from "~/constants";

import { users } from "./auth";
import { id, timestamps } from "./common";
import { providers } from "./providers";

export const tariffType = pgEnum("tariff_type", tariffTypes);

export const tariffs = pgTable(
  "tariffs",
  {
    id: id(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerId: uuid()
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    tariffType: tariffType().notNull().default("counter-based"),
    name: text().notNull(),
    startDate: date().notNull(),
    description: text(),
    isActive: boolean().notNull().default(true),

    ...timestamps(),
  },
  (t) => [
    index("idx_tariffs_user_id").on(t.userId),
    index("idx_tariffs_provider_by_date").on(t.providerId, t.startDate),
  ]
);

export const tariffZones = pgTable(
  "tariff_zones",
  {
    id: id(),
    tariffId: uuid()
      .notNull()
      .references(() => tariffs.id, { onDelete: "cascade" }),
    name: text().notNull(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    description: text(),

    ...timestamps(),
  },
  (t) => [index("idx_tariff_zones_tariff_id").on(t.tariffId)]
);
