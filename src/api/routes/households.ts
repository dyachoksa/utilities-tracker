import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";
import { z } from "zod";

import { notFoundSchema } from "~/api/schemas";
import { HouseholdCreateSchema, HouseholdSchema, HouseholdUpdateSchema } from "~/schemas/households";

export const tags = ["Households"];

export const basePath = "/households";

export const list = createRoute({
  tags,
  path: basePath,

  method: "get",
  summary: "Get households",
  description: "Retrieves a list of households for the authenticated user.",
  operationId: "listHouseholds",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(HouseholdSchema), "List of households"),
  },
});

export const create = createRoute({
  tags,
  path: basePath,

  method: "post",
  summary: "Create household",
  description: "Creates a new household for the authenticated user.",
  operationId: "createHousehold",
  request: {
    body: jsonContentRequired(HouseholdCreateSchema, "Household to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(HouseholdSchema, "Household"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(HouseholdCreateSchema), "Invalid data"),
  },
});

export const get = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "get",
  summary: "Get household",
  description: "Retrieves a household by ID.",
  operationId: "getHousehold",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(HouseholdSchema, "Household"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export const update = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "patch",
  summary: "Update household",
  description: "Updates an existing household by ID.",
  operationId: "updateHousehold",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(HouseholdUpdateSchema, "Household to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(HouseholdSchema, "Household"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema).or(createErrorSchema(HouseholdUpdateSchema)),
      "Validation data"
    ),
  },
});

export const remove = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "delete",
  summary: "Delete household",
  description: "Deletes an existing household by ID.",
  operationId: "deleteHousehold",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "Household deleted" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetRoute = typeof get;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
