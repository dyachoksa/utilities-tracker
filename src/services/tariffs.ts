import type { TariffInsertData, TariffUpdateData, TariffZoneInsertData, TariffZoneUpdateData } from "~/db/types";
import type { RequestIdOption } from "~/types/common";

import { formatISO } from "date-fns";
import { and, eq, lte } from "drizzle-orm";

import { db } from "~/db";
import { tariffs, tariffZones } from "~/db/schemas";
import { logger } from "~/lib/logger";

type GetTariffsOptions = RequestIdOption;
export const getTariffs = async (userId: string, providerId: string, options?: GetTariffsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, providerId }, "Getting tariffs");

  return db.query.tariffs.findMany({
    where: and(eq(tariffs.userId, userId), eq(tariffs.providerId, providerId)),
    with: { tariffZones: true },
  });
};

type GetTariffOptions = RequestIdOption;
export const getTariff = async (userId: string, tariffId: string, options?: GetTariffOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, tariffId }, "Getting tariff details");

  return db.query.tariffs.findFirst({
    where: and(eq(tariffs.userId, userId), eq(tariffs.id, tariffId)),
    with: { tariffZones: true },
  });
};

type GetActiveTariffOptions = RequestIdOption;
export const getActiveTariff = async (userId: string, providerId: string, options?: GetActiveTariffOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, providerId }, "Getting active tariff");

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

type GetTariffZonesOptions = RequestIdOption;
export const getTariffZones = async (tariffId: string, options?: GetTariffZonesOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffId }, "Getting tariff zones");

  return db.query.tariffZones.findMany({
    where: eq(tariffZones.tariffId, tariffId),
  });
};

type CreateTariffOptions = RequestIdOption;
export const createTariff = async (tariff: TariffInsertData, options?: CreateTariffOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariff }, "Creating tariff");

  const [result] = await db.insert(tariffs).values(tariff).returning();

  if (!result) {
    throw new Error("Failed to create tariff");
  }

  return result;
};

type CreateTariffZoneOptions = RequestIdOption;
export const createTariffZone = async (tariffZone: TariffZoneInsertData, options?: CreateTariffZoneOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffZone }, "Creating tariff zone");

  const [result] = await db.insert(tariffZones).values(tariffZone).returning();

  if (!result) {
    throw new Error("Failed to create tariff zone");
  }

  return result;
};

type CreateTariffZonesOptions = RequestIdOption;
export const createTariffZones = async (values: TariffZoneInsertData[], options?: CreateTariffZonesOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ values }, "Creating tariff zones");

  const result = await db.insert(tariffZones).values(values).returning();

  if (result.length === 0) {
    throw new Error("Failed to create tariff zones");
  }

  if (result.length !== values.length) {
    // todo: warn about failed insertions
  }

  return result;
};

type UpdateTariffOptions = RequestIdOption;
export const updateTariff = async (
  userId: string,
  tariffId: string,
  tariff: TariffUpdateData,
  options?: UpdateTariffOptions
) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, tariffId, tariff }, "Updating tariff");

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

type UpdateTariffZoneOptions = RequestIdOption;
export const updateTariffZone = async (
  tariffId: string,
  tariffZoneId: string,
  tariffZone: TariffZoneUpdateData,
  options?: UpdateTariffZoneOptions
) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffId, tariffZoneId, tariffZone }, "Updating tariff zone");

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

type DeleteTariffOptions = RequestIdOption;
export const deleteTariff = async (userId: string, tariffId: string, options?: DeleteTariffOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, tariffId }, "Deleting tariff");

  const [result] = await db
    .delete(tariffs)
    .where(and(eq(tariffs.id, tariffId), eq(tariffs.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete tariff");
  }

  return result;
};

type DeleteTariffZoneOptions = RequestIdOption;
export const deleteTariffZone = async (tariffId: string, tariffZoneId: string, options?: DeleteTariffZoneOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffId, tariffZoneId }, "Deleting tariff zone");

  const [result] = await db
    .delete(tariffZones)
    .where(and(eq(tariffZones.id, tariffZoneId), eq(tariffZones.tariffId, tariffId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete tariff zone");
  }

  return result;
};

type DeleteTariffZonesOptions = RequestIdOption;
export const deleteTariffZones = async (tariffId: string, options?: DeleteTariffZonesOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffId }, "Deleting tariff zones");

  await db.delete(tariffZones).where(eq(tariffZones.tariffId, tariffId));

  // note: should we care to check if any rows were deleted?

  return true;
};
