import { relations } from "drizzle-orm";

import { users } from "./auth";
import { households } from "./households";
import { meterReadings } from "./meter-readings";
import { payments } from "./payments";
import { providers } from "./providers";
import { tariffs, tariffZones } from "./tariffs";

export const userRelations = relations(users, ({ many }) => ({
  households: many(households),
  providers: many(providers),
  tariffs: many(tariffs),
  payments: many(payments),
}));

export const householdRelations = relations(households, ({ one, many }) => ({
  user: one(users, {
    fields: [households.userId],
    references: [users.id],
  }),
  providers: many(providers),
  payments: many(payments),
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
  payments: many(payments),
  meterReadings: many(meterReadings),
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
  payments: many(payments),
}));

export const tariffZoneRelations = relations(tariffZones, ({ one, many }) => ({
  tariff: one(tariffs, {
    fields: [tariffZones.tariffId],
    references: [tariffs.id],
  }),
  meterReadings: many(meterReadings),
}));

export const paymentRelations = relations(payments, ({ one, many }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  household: one(households, {
    fields: [payments.householdId],
    references: [households.id],
  }),
  provider: one(providers, {
    fields: [payments.providerId],
    references: [providers.id],
  }),
  tariff: one(tariffs, {
    fields: [payments.tariffId],
    references: [tariffs.id],
  }),
  meterReadings: many(meterReadings),
}));

export const meterReadingRelations = relations(meterReadings, ({ one }) => ({
  provider: one(providers, {
    fields: [meterReadings.providerId],
    references: [providers.id],
  }),
  tariffZone: one(tariffZones, {
    fields: [meterReadings.tariffZoneId],
    references: [tariffZones.id],
  }),
  payment: one(payments, {
    fields: [meterReadings.paymentId],
    references: [payments.id],
  }),
}));
