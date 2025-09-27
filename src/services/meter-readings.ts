import type { MeterReadingInsertData } from "~/db/types";

import { eq } from "drizzle-orm";

import { db } from "~/db";
import { meterReadings } from "~/db/schemas";

export const getLatestReadings = (tariffZoneId: string) => {
  return (
    db.query.meterReadings.findFirst({
      where: eq(meterReadings.tariffZoneId, tariffZoneId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    }) || null
  );
};

export const createMeterReadings = (data: MeterReadingInsertData[]) => {
  return db.insert(meterReadings).values(data).returning();
};
