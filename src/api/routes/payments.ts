import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, createMessageObjectSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { PaymentCreateSchema, PaymentMarkAsPaidSchema, PaymentSchema, PaymentsListSchema } from "~/schemas/payments";

import { PaginationQuerySchema } from "../schemas";

export const tags = ["Payments"];

export const basePath = "/payments";

export const list = createRoute({
  tags,
  path: basePath,

  method: "get",
  summary: "Get payments",
  description: "Retrieves a list of payments for the authenticated user.",
  operationId: "listPayments",
  request: {
    query: PaginationQuerySchema.extend({
      providerId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
      tariffId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
      householdId: z.uuid().optional().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    }).openapi("ListPaymentsQuery"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PaymentsListSchema, "List of payments"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createMessageObjectSchema("Invalid query parameters"),
      "Invalid query parameters"
    ),
  },
});

export const create = createRoute({
  tags,
  path: basePath,

  method: "post",
  summary: "Create payment",
  description: "Creates a new payment for the authenticated user.",
  operationId: "createPayment",
  request: {
    body: jsonContentRequired(PaymentCreateSchema, "Payment to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(PaymentSchema, "Payment"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(createMessageObjectSchema("Invalid data"), "Invalid data"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(PaymentCreateSchema), "Invalid data"),
  },
});

export const markAsPaid = createRoute({
  tags,
  path: `${basePath}/:id/mark-as-paid`,

  method: "post",
  summary: "Mark as paid",
  description: "Marks a payment as paid for the authenticated user.",
  operationId: "markAsPaid",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(PaymentMarkAsPaidSchema, "Payment to mark as paid"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(PaymentSchema, "Payment"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(createMessageObjectSchema("Payment not found"), "Payment not found"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(createMessageObjectSchema("Invalid data"), "Invalid data"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(PaymentMarkAsPaidSchema), "Invalid data"),
  },
});

export const remove = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "delete",
  summary: "Remove payment",
  description: "Removes a payment for the authenticated user.",
  operationId: "removePayment",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "Payment deleted" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(createMessageObjectSchema("Payment not found"), "Payment not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid payment ID"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type MarkAsPaidRoute = typeof markAsPaid;
export type RemoveRoute = typeof remove;
