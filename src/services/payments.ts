import type { PaymentInsertData } from "~/db/types";

import { and, eq } from "drizzle-orm";

import { db } from "~/db";
import { payments } from "~/db/schemas";
import { PaymentMarkAsPaidData } from "~/types/payments";

export type GetPaymentsParams = {
  userId: string;
  page?: number;
  perPage?: number;
  householdId?: string;
  providerId?: string;
  tariffId?: string;
};
export const getPayments = async (params: GetPaymentsParams) => {
  const { userId, page = 1, perPage = 25, householdId, providerId, tariffId } = params;

  let where = eq(payments.userId, userId);

  if (householdId) {
    where = and(where, eq(payments.householdId, householdId))!;
  }

  if (providerId) {
    where = and(where, eq(payments.providerId, providerId))!;
  }

  if (tariffId) {
    where = and(where, eq(payments.tariffId, tariffId))!;
  }

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

export const createPayment = async (data: PaymentInsertData) => {
  const [payment] = await db.insert(payments).values(data).returning();

  if (!payment) {
    throw new Error("Failed to create payment");
  }

  return payment;
};

export const markPaymentAsPaid = async (userId: string, paymentId: string, data: PaymentMarkAsPaidData) => {
  const [payment] = await db
    .update(payments)
    .set({ ...data, isPaid: true })
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)))
    .returning();

  return payment || null;
};

export const deletePayment = async (userId: string, paymentId: string) => {
  const [payment] = await db
    .delete(payments)
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)))
    .returning();

  return payment || null;
};
