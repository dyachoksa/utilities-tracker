import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { MeterReadingSchema } from "~/schemas/meter-readings";
import { TariffCreateSchema, TariffSchema, TariffUpdateSchema } from "~/schemas/tariffs";

import { notFoundSchema } from "../schemas";

export const tags = ["Tariffs"];

export const basePath = "/tariffs";

export const list = createRoute({
  tags,
  path: basePath,

  method: "get",
  summary: "Get tariffs",
  description: "Retrieves a list of tariffs for the authenticated user.",
  operationId: "listTariffs",
  request: {
    query: z.object({
      providerId: z.uuid().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "Provider ID to filter tariffs by",
      }),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(TariffSchema), "List of tariffs"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ providerId: z.uuid() })),
      "Invalid provider ID"
    ),
  },
});

export const create = createRoute({
  tags,
  path: basePath,

  method: "post",
  summary: "Create tariff",
  description: "Creates a new tariff for the authenticated user.",
  operationId: "createTariff",
  request: {
    body: jsonContentRequired(TariffCreateSchema, "Tariff to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(TariffSchema, "Tariff"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(TariffCreateSchema), "Invalid data"),
  },
});

export const get = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "get",
  summary: "Get tariff",
  description: "Retrieves a tariff by ID.",
  operationId: "getTariff",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TariffSchema, "Tariff"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export const latestReadings = createRoute({
  tags,
  path: `${basePath}/:id/latest-readings`,

  method: "get",
  summary: "Get latest readings",
  description: "Retrieves the latest meter readings for a tariff.",
  operationId: "latestReadings",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(MeterReadingSchema), "Meter readings"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export const update = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "patch",
  summary: "Update tariff",
  description: "Updates an existing tariff by ID.",
  operationId: "updateTariff",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(TariffUpdateSchema, "Tariff to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TariffSchema, "Tariff"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema).or(createErrorSchema(TariffUpdateSchema)),
      "Validation error"
    ),
  },
});

export const remove = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "delete",
  summary: "Delete tariff",
  description: "Deletes an existing tariff by ID.",
  operationId: "deleteTariff",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "Tariff deleted" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetRoute = typeof get;
export type LatestReadingsRoute = typeof latestReadings;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
