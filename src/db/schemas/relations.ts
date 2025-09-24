import { relations } from "drizzle-orm";

import { users } from "./auth";
import { households } from "./households";
import { providers } from "./providers";
import { tariffs, tariffZones } from "./tariffs";

export const userRelations = relations(users, ({ many }) => ({
  households: many(households),
  providers: many(providers),
  tariffs: many(tariffs),
}));

export const householdRelations = relations(households, ({ one, many }) => ({
  user: one(users, {
    fields: [households.userId],
    references: [users.id],
  }),
  providers: many(providers),
}));

export const providerRelations = relations(providers, ({ one, many }) => ({
  user: one(users, {
    fields: [providers.userId],
    references: [users.id],
  }),
  household: one(households, {
    fields: [providers.householdId],
    references: [households.id],
  }),
  tariffs: many(tariffs),
}));

export const tariffRelations = relations(tariffs, ({ one, many }) => ({
  user: one(users, {
    fields: [tariffs.userId],
    references: [users.id],
  }),
  provider: one(providers, {
    fields: [tariffs.providerId],
    references: [providers.id],
  }),
  tariffZones: many(tariffZones),
}));

export const tariffZoneRelations = relations(tariffZones, ({ one }) => ({
  tariff: one(tariffs, {
    fields: [tariffZones.tariffId],
    references: [tariffs.id],
  }),
}));
