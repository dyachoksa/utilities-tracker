import type { ProviderInsertData, ProviderUpdateData } from "~/db/types";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { providers } from "~/db/schemas";

export const getProviders = async (userId: string, householdId?: string) => {
  let where = eq(providers.userId, userId);

  if (householdId) {
    where = and(where, eq(providers.householdId, householdId))!;
  }

  return db.query.providers.findMany({ where });
};

export const getProvider = async (userId: string, providerId: string) => {
  return (
    db.query.providers.findFirst({ where: and(eq(providers.userId, userId), eq(providers.id, providerId)) }) ?? null
  );
};

export const createProvider = async (provider: ProviderInsertData) => {
  const [result] = await db.insert(providers).values(provider).returning();

  if (!result) {
    throw new Error("Failed to create provider");
  }

  return result;
};

export const updateProvider = async (userId: string, providerId: string, provider: ProviderUpdateData) => {
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

export const deleteProvider = async (userId: string, providerId: string) => {
  const [result] = await db
    .delete(providers)
    .where(and(eq(providers.id, providerId), eq(providers.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete provider");
  }

  return result;
};
