import { relations } from "drizzle-orm";

import { users } from "./auth";
import { households } from "./households";

export const userRelations = relations(users, ({ many }) => ({
  households: many(households),
}));

export const householdRelations = relations(households, ({ one }) => ({
  user: one(users, {
    fields: [households.userId],
    references: [users.id],
  }),
}));
