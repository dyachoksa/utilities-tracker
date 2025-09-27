import { boolean, date, decimal, index, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { id, timestamps } from "./common";
import { households } from "./households";
import { providers } from "./providers";
import { tariffs } from "./tariffs";

export const payments = pgTable(
  "payments",
  {
    id: id(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    householdId: uuid()
      .notNull()
      .references(() => households.id, { onDelete: "cascade" }),
    providerId: uuid()
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    tariffId: uuid()
      .notNull()
      .references(() => tariffs.id, { onDelete: "cascade" }),
    // The amount of the payment (auto-calculated based tariffs and meter readings).
    amount: decimal({ precision: 10, scale: 2 }).notNull(),
    // The actual amount of the payment that has been paid.
    paidAmount: decimal({ precision: 10, scale: 2 }).notNull(),
    // The period for which the payment is made for. Any date within the period can be used. Usually the first day of the month.
    // Most of the time this will be a previous month, but it's possible to pay for the current month.
    paymentPeriod: date().notNull(),
    description: text(),
    isPaid: boolean().notNull().default(false),

    ...timestamps(),
  },
  (t) => [
    index("idx_payments_user_id").on(t.userId),
    index("idx_payments_household_id").on(t.householdId),
    index("idx_payments_provider_id").on(t.providerId),
    index("idx_payments_tariff_id").on(t.tariffId),
    index("idx_payments_by_date").on(t.paymentPeriod.desc(), t.createdAt),
  ]
);
