import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import {
  PaymentsByMonthsQuerySchema,
  PaymentsByMonthsSchema,
  PaymentsByTypeQuerySchema,
  PaymentsByTypeSchema,
  PaymentTotalsSchema,
} from "~/schemas/stats";

export const tags = ["Stats"];

export const basePath = "/stats";

export const paymentTotals = createRoute({
  tags,
  path: `${basePath}/payment-totals`,

  method: "get",
  summary: "Get payment totals",
  description: "Retrieves payment totals for the current month for the authenticated user.",
  operationId: "paymentTotals",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PaymentTotalsSchema, "Payment totals"),
  },
});

export const paymentsByType = createRoute({
  tags,
  path: `${basePath}/payments-by-type`,

  method: "get",
  summary: "Get payments by type",
  description: "Retrieves a list of payments by type for the authenticated user.",
  operationId: "paymentsByType",
  request: {
    query: PaymentsByTypeQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PaymentsByTypeSchema, "Payments by type"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(PaymentsByTypeQuerySchema), "Invalid query"),
  },
});

export const paymentsByMonths = createRoute({
  tags,
  path: `${basePath}/payments-by-months`,

  method: "get",
  summary: "Get payments by months",
  description: "Retrieves a list of payments by months for the authenticated user.",
  operationId: "paymentsByMonths",
  request: {
    query: PaymentsByMonthsQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PaymentsByMonthsSchema, "Payments by months"),
  },
});

export type PaymentTotalsRoute = typeof paymentTotals;
export type PaymentsByTypeRoute = typeof paymentsByType;
export type PaymentsByMonthsRoute = typeof paymentsByMonths;
