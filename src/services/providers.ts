import type { ProviderInsertData, ProviderUpdateData } from "~/db/types";
import type { RequestIdOption } from "~/types/common";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { providers } from "~/db/schemas";
import { logger } from "~/lib/logger";

type GetProvidersOptions = RequestIdOption;
export const getProviders = async (userId: string, householdId?: string, options?: GetProvidersOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, householdId }, "Getting providers");

  let where = eq(providers.userId, userId);

  if (householdId) {
    where = and(where, eq(providers.householdId, householdId))!;
  }

  return db.query.providers.findMany({ where });
};

type GetProviderOptions = RequestIdOption;
export const getProvider = async (userId: string, providerId: string, options?: GetProviderOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, providerId }, "Getting provider");

  return (
    db.query.providers.findFirst({ where: and(eq(providers.userId, userId), eq(providers.id, providerId)) }) ?? null
  );
};

type CreateProviderOptions = RequestIdOption;
export const createProvider = async (provider: ProviderInsertData, options?: CreateProviderOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ provider }, "Creating provider");

  const [result] = await db.insert(providers).values(provider).returning();

  if (!result) {
    throw new Error("Failed to create provider");
  }

  return result;
};

type UpdateProviderOptions = RequestIdOption;
export const updateProvider = async (
  userId: string,
  providerId: string,
  provider: ProviderUpdateData,
  options?: UpdateProviderOptions
) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, providerId, provider }, "Updating provider");

  const [result] = await db
    .update(providers)
    .set(provider)
    .where(and(eq(providers.id, providerId), eq(providers.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to update provider");
  }

  return result;
};

type DeleteProviderOptions = RequestIdOption;
export const deleteProvider = async (userId: string, providerId: string, options?: DeleteProviderOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, providerId }, "Deleting provider");

  const [result] = await db
    .delete(providers)
    .where(and(eq(providers.id, providerId), eq(providers.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete provider");
  }

  return result;
};
