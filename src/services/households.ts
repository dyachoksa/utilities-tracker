import type { HouseholdInsertData, HouseholdUpdateData } from "~/db/types";
import type { RequestIdOption } from "~/types/common";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { households } from "~/db/schemas";
import { logger } from "~/lib/logger";

type GetHouseholdsOptions = RequestIdOption;
export const getHouseholds = async (userId: string, options?: GetHouseholdsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId }, "Getting households");
  return db.query.households.findMany({ where: eq(households.userId, userId) });
};

type GetHouseholdOptions = RequestIdOption;
export const getHousehold = async (userId: string, householdId: string, options?: GetHouseholdOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, householdId }, "Getting household");
  return (
    db.query.households.findFirst({ where: and(eq(households.userId, userId), eq(households.id, householdId)) }) ?? null
  );
};

type CreateHouseholdOptions = RequestIdOption;
export const createHousehold = async (household: HouseholdInsertData, options?: CreateHouseholdOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ household }, "Creating household");
  const [result] = await db.insert(households).values(household).returning();

  if (!result) {
    throw new Error("Failed to create household");
  }

  return result;
};

type UpdateHouseholdOptions = RequestIdOption;
export const updateHousehold = async (
  userId: string,
  householdId: string,
  household: HouseholdUpdateData,
  options?: UpdateHouseholdOptions
) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, householdId, household }, "Updating household");
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

type DeleteHouseholdOptions = RequestIdOption;
export const deleteHousehold = async (userId: string, householdId: string, options?: DeleteHouseholdOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, householdId }, "Deleting household");
  const [result] = await db
    .delete(households)
    .where(and(eq(households.id, householdId), eq(households.userId, userId)))
    .returning();

  if (!result) {
    throw new Error("Failed to delete household");
  }

  return result;
};
