import type { MeterReadingInsertData } from "~/db/types";
import type { RequestIdOption } from "~/types/common";

import { eq } from "drizzle-orm";

import { db } from "~/db";
import { meterReadings } from "~/db/schemas";
import { logger } from "~/lib/logger";

type GetLatestReadingsOptions = RequestIdOption;
export const getLatestReadings = (tariffZoneId: string, options?: GetLatestReadingsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ tariffZoneId }, "Getting latest readings");

  return (
    db.query.meterReadings.findFirst({
      where: eq(meterReadings.tariffZoneId, tariffZoneId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    }) || null
  );
};

type CreateMeterReadingsOptions = RequestIdOption;
export const createMeterReadings = (data: MeterReadingInsertData[], options?: CreateMeterReadingsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ data }, "Creating meter readings");

  return db.insert(meterReadings).values(data).returning();
};
