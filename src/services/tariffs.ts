import type { TariffInsertData, TariffUpdateData, TariffZoneInsertData, TariffZoneUpdateData } from "~/db/types";

import { formatISO } from "date-fns";
import { and, eq, lte } from "drizzle-orm";

import { db } from "~/db";
import { tariffs, tariffZones } from "~/db/schemas";

export const getTariffs = async (userId: string, providerId: string) => {
  return db.query.tariffs.findMany({
    where: and(eq(tariffs.userId, userId), eq(tariffs.providerId, providerId)),
    with: { tariffZones: true },
  });
};

export const getTariff = async (userId: string, tariffId: string) => {
  return db.query.tariffs.findFirst({
    where: and(eq(tariffs.userId, userId), eq(tariffs.id, tariffId)),
    with: { tariffZones: true },
  });
};

export const getActiveTariff = async (userId: string, providerId: string) => {
  const tariff = await db.query.tariffs.findFirst({
    where: and(
      eq(tariffs.userId, userId),
      eq(tariffs.providerId, providerId),
      eq(tariffs.isActive, true),
      lte(tariffs.startDate, formatISO(new Date(), { representation: "date" }))
    ),
    orderBy: (tariffs, { desc }) => [desc(tariffs.startDate)],
    with: { tariffZones: true },
  });

  return tariff || null;
};

export const getTariffZones = async (tariffId: string) => {
  return db.query.tariffZones.findMany({
    where: eq(tariffZones.tariffId, tariffId),
  });
};

export const createTariff = async (tariff: TariffInsertData) => {
  const [result] = await db.insert(tariffs).values(tariff).returning();

  if (!result) {
    throw new Error("Failed to create tariff");
  }

  return result;
};

export const createTariffZone = async (tariffZone: TariffZoneInsertData) => {
  const [result] = await db.insert(tariffZones).values(tariffZone).returning();

  if (!result) {
    throw new Error("Failed to create tariff zone");
  }

  return result;
};

export const createTariffZones = async (values: TariffZoneInsertData[]) => {
  const result = await db.insert(tariffZones).values(values).returning();

  if (result.length === 0) {
    throw new Error("Failed to create tariff zones");
  }

  if (result.length !== values.length) {
    // todo: warn about failed insertions
  }

  return result;
};

export const updateTariff = async (userId: string, tariffId: string, tariff: TariffUpdateData) => {
  const [result] = await db
    .update(tariffs)
    .set(tariff)
    .where(and(eq(tariffs.id, tariffId), eq(tariffs.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to update tariff");
  }

  return result;
};

export const updateTariffZone = async (tariffId: string, tariffZoneId: string, tariffZone: TariffZoneUpdateData) => {
  const [result] = await db
    .update(tariffZones)
    .set(tariffZone)
    .where(and(eq(tariffZones.id, tariffZoneId), eq(tariffZones.tariffId, tariffId)))
    .returning();

  if (!result) {
    throw new Error("Failed to update tariff zone");
  }

  return result;
};

export const deleteTariff = async (userId: string, tariffId: string) => {
  const [result] = await db
    .delete(tariffs)
    .where(and(eq(tariffs.id, tariffId), eq(tariffs.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete tariff");
  }

  return result;
};

export const deleteTariffZone = async (tariffId: string, tariffZoneId: string) => {
  const [result] = await db
    .delete(tariffZones)
    .where(and(eq(tariffZones.id, tariffZoneId), eq(tariffZones.tariffId, tariffId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete tariff zone");
  }

  return result;
};

export const deleteTariffZones = async (tariffId: string) => {
  await db.delete(tariffZones).where(eq(tariffZones.tariffId, tariffId));

  // note: should we care to check if any rows were deleted?

  return true;
};
