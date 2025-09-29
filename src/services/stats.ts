import type { PaymentsByMonthsQuery, PaymentsByType, PaymentsByTypeQuery } from "~/types/stats";

import { endOfMonth, formatISO, startOfMonth } from "date-fns";
import { and, between, desc, eq, sql } from "drizzle-orm";

import { db } from "~/db";
import { payments, providers } from "~/db/schemas";
import { logger } from "~/lib/logger";
import { RequestIdOption } from "~/types/common";

type GetPaymentsByTypeParams = PaymentsByTypeQuery & { userId: string };
type GetPaymentsByTypeOptions = RequestIdOption;
export const getPaymentsByType = async (
  params: GetPaymentsByTypeParams,
  options?: GetPaymentsByTypeOptions
): Promise<PaymentsByType> => {
  const log = logger.child({ reqId: options?.requestId });

  const { period = formatISO(new Date(), { representation: "date" }) } = params;

  const startDate = startOfMonth(period);
  const endDate = endOfMonth(period);

  log.debug({ params, startDate, endDate }, "Getting payments by type");

  const values = await db
    .select({
      providerType: providers.providerType,
      amount: sql<string>`sum(${payments.amount})`,
    })
    .from(payments)
    .innerJoin(providers, eq(payments.providerId, providers.id))
    .where(and(eq(payments.userId, params.userId), between(payments.createdAt, startDate, endDate)))
    .groupBy(providers.providerType);

  return { values, period };
};

type GetPaymentsByMonthsParams = PaymentsByMonthsQuery & { userId: string };
type GetPaymentsByMonthsOptions = RequestIdOption;
export const getPaymentsByMonths = async (params: GetPaymentsByMonthsParams, options?: GetPaymentsByMonthsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ params }, "Getting payments by months");

  let where = eq(payments.userId, params.userId);

  if (params.householdId) {
    where = and(where, eq(payments.householdId, params.householdId))!;
  }

  if (params.providerId) {
    where = and(where, eq(payments.providerId, params.providerId))!;
  }

  const values = await db
    .select({
      period: sql<string>`date_trunc('month', ${payments.createdAt})`,
      amount: sql<string>`sum(${payments.amount})`,
      paidAmount: sql<string>`sum(${payments.paidAmount})`,
    })
    .from(payments)
    .where(where)
    .groupBy(sql`date_trunc('month', ${payments.createdAt})`)
    .orderBy(desc(sql`date_trunc('month', ${payments.createdAt})`))
    .limit(12);

  values.reverse();

  return values;
};
