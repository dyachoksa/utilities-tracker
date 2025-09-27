import { z } from "@hono/zod-openapi";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const notFoundSchema = createMessageObjectSchema("Object not found");

export const PaginationQuerySchema = z
  .object({
    page: z.coerce.number().default(1).openapi({ example: 1, description: "Page number" }),
    perPage: z.coerce.number().default(25).openapi({ example: 25, description: "Number of items per page" }),
  })
  .openapi("PaginationQuery");

export const PaginationMetaSchema = z.object({
  page: z.number().openapi({ example: 1, description: "Page number" }),
  perPage: z.number().openapi({ example: 25, description: "Number of items per page" }),
  total: z.number().openapi({ example: 100, description: "Total number of items" }),
  count: z.number().openapi({ example: 20, description: "Number of items on the current page" }),
});
