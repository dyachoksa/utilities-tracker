import { boolean, index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { providerTypes } from "~/constants";

import { users } from "./auth";
import { id, timestamps } from "./common";
import { households } from "./households";

export const providerType = pgEnum("provider_type", providerTypes);

export const providers = pgTable(
  "providers",
  {
    id: id(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    householdId: uuid()
      .notNull()
      .references(() => households.id, { onDelete: "cascade" }),
    providerType: providerType().notNull(),
    name: text().notNull(),
    accountNumber: text(),
    websiteUrl: text(),
    isActive: boolean().notNull().default(true),

    ...timestamps(),
  },
  (t) => [index("idx_providers_user_id").on(t.userId), index("idx_providers_household_id").on(t.householdId)]
);
