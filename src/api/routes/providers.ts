import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";

import { ProviderCreateSchema, ProviderSchema, ProviderUpdateSchema } from "~/schemas/providers";

import { notFoundSchema } from "../schemas";

export const tags = ["Providers"];

export const basePath = "/providers";

export const list = createRoute({
  tags,
  path: basePath,

  method: "get",
  summary: "Get providers",
  description: "Retrieves a list of providers for the authenticated user.",
  operationId: "listProviders",
  request: {
    query: z.object({
      householdId: z.uuid().optional().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "Household ID to filter providers by",
      }),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(ProviderSchema), "List of providers"),
  },
});

export const create = createRoute({
  tags,
  path: basePath,

  method: "post",
  summary: "Create provider",
  description: "Creates a new provider for the authenticated user.",
  operationId: "createProvider",
  request: {
    body: jsonContentRequired(ProviderCreateSchema, "Provider to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(ProviderSchema, "Provider"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(ProviderCreateSchema), "Invalid data"),
  },
});

export const get = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "get",
  summary: "Get provider",
  description: "Retrieves a provider by ID.",
  operationId: "getProvider",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ProviderSchema, "Provider"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export const update = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "patch",
  summary: "Update provider",
  description: "Updates an existing provider by ID.",
  operationId: "updateProvider",
  request: {
    params: IdUUIDParamsSchema,
    body: jsonContentRequired(ProviderUpdateSchema, "Provider to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ProviderSchema, "Provider"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdUUIDParamsSchema).or(createErrorSchema(ProviderUpdateSchema)),
      "Validation error"
    ),
  },
});

export const remove = createRoute({
  tags,
  path: `${basePath}/:id`,

  method: "delete",
  summary: "Delete provider",
  description: "Deletes an existing provider by ID.",
  operationId: "deleteProvider",
  request: {
    params: IdUUIDParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "Provider deleted" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid ID"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetRoute = typeof get;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
