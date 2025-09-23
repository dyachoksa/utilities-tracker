import { boolean, decimal, index, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { id, timestamps } from "./common";

export const households = pgTable(
  "households",
  {
    id: id(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text().notNull(),
    address: text().notNull(),
    area: decimal({ precision: 10, scale: 2 }),
    isActive: boolean().notNull().default(true),

    ...timestamps(),
  },
  (t) => [index("idx_households_user_id").on(t.userId)]
);
