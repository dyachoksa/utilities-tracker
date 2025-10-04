import type { PaymentsByMonthsRoute, PaymentsByTypeRoute, PaymentTotalsRoute } from "~/api/routes/stats";

import * as HttpStatusCodes from "stoker/http-status-codes";

import { getPaymentsByMonths, getPaymentsByType, getPaymentTotals } from "~/services/stats";
import { AppRouteHandler } from "~/types/api";

export const paymentTotals: AppRouteHandler<PaymentTotalsRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const paymentTotals = await getPaymentTotals({ userId }, { requestId: c.get("requestId") });

  return c.json(paymentTotals, HttpStatusCodes.OK);
};

export const paymentsByType: AppRouteHandler<PaymentsByTypeRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const query = c.req.valid("query");

  const paymentsByType = await getPaymentsByType({ userId, ...query }, { requestId: c.get("requestId") });

  return c.json(paymentsByType, HttpStatusCodes.OK);
};

export const paymentsByMonths: AppRouteHandler<PaymentsByMonthsRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const query = c.req.valid("query");

  const paymentsByMonths = await getPaymentsByMonths({ userId, ...query }, { requestId: c.get("requestId") });

  return c.json(paymentsByMonths, HttpStatusCodes.OK);
};
