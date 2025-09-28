import type { PaymentInsertData } from "~/db/types";
import type { RequestIdOption } from "~/types/common";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { payments } from "~/db/schemas";
import { logger } from "~/lib/logger";
import { PaymentListQueryParams, PaymentMarkAsPaidData } from "~/types/payments";

type GetPaymentsParams = PaymentListQueryParams & { userId: string };
type GetPaymentsOptions = RequestIdOption;
export const getPayments = async (params: GetPaymentsParams, options?: GetPaymentsOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  const { userId, page = 1, perPage = 25, householdId, providerId, tariffId, isPaid } = params;

  let where = eq(payments.userId, userId);

  if (isPaid !== undefined) {
    where = and(where, eq(payments.isPaid, isPaid))!;
  }

  if (householdId) {
    where = and(where, eq(payments.householdId, householdId))!;
  }

  if (providerId) {
    where = and(where, eq(payments.providerId, providerId))!;
  }

  if (tariffId) {
    where = and(where, eq(payments.tariffId, tariffId))!;
  }

  log.debug({ where }, "Getting payments");

  const items = await db.query.payments.findMany({
    where,
    orderBy: (payments, { desc, asc }) => [desc(payments.paymentPeriod), asc(payments.createdAt)],
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      household: true,
      provider: true,
      meterReadings: {
        with: {
          tariffZone: true,
        },
      },
    },
  });

  const total = await db.$count(payments, where);

  return { items, total };
};

type CreatePaymentOptions = RequestIdOption;
export const createPayment = async (data: PaymentInsertData, options?: CreatePaymentOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ data }, "Creating payment");

  const [payment] = await db.insert(payments).values(data).returning();

  if (!payment) {
    throw new Error("Failed to create payment");
  }

  return payment;
};

type MarkPaymentAsPaidOptions = RequestIdOption;
export const markPaymentAsPaid = async (
  userId: string,
  paymentId: string,
  data: PaymentMarkAsPaidData,
  options?: MarkPaymentAsPaidOptions
) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, paymentId, data }, "Marking payment as paid");

  const [payment] = await db
    .update(payments)
    .set({ ...data, isPaid: true })
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)))
    .returning();

  return payment || null;
};

type DeletePaymentOptions = RequestIdOption;
export const deletePayment = async (userId: string, paymentId: string, options?: DeletePaymentOptions) => {
  const log = logger.child({ reqId: options?.requestId });

  log.debug({ userId, paymentId }, "Deleting payment");

  const [payment] = await db
    .delete(payments)
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)))
    .returning();

  return payment || null;
};
