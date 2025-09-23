import type { HouseholdInsertData, HouseholdUpdateData } from "~/db/types";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { households } from "~/db/schemas";

export const getHouseholds = async (userId: string) => {
  return db.query.households.findMany({ where: eq(households.userId, userId) });
};

export const getHousehold = async (userId: string, householdId: string) => {
  return (
    db.query.households.findFirst({ where: and(eq(households.userId, userId), eq(households.id, householdId)) }) ?? null
  );
};

export const createHousehold = async (household: HouseholdInsertData) => {
  const [result] = await db.insert(households).values(household).returning();

  if (!result) {
    throw new Error("Failed to create household");
  }

  return result;
};

export const updateHousehold = async (userId: string, householdId: string, household: HouseholdUpdateData) => {
  const [result] = await db
    .update(households)
    .set(household)
    .where(and(eq(households.id, householdId), eq(households.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to update household");
  }

  return result;
};

export const deleteHousehold = async (userId: string, householdId: string) => {
  const [result] = await db
    .delete(households)
    .where(and(eq(households.id, householdId), eq(households.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete household");
  }

  return result;
};
