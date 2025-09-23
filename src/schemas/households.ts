import { z } from "@hono/zod-openapi";

export const HouseholdSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    name: z.string().openapi({ example: "Household" }),
    address: z.string().openapi({ example: "123 Main St", description: "Address of the household" }),
    area: z
      .union([z.string().regex(/^[1-9][0-9]*\.?[0-9]*$/), z.literal("")])
      .nullable()
      .transform((value) => (value?.trim() ? value.trim() : null))
      .openapi({ example: "85.45", description: "Area in square meters" }),
    isActive: z.boolean().openapi({ example: true }),
    createdAt: z.iso.datetime().openapi({ example: "2022-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2022-01-01T00:00:00.000Z" }),
  })
  .openapi("Household");

export const HouseholdCreateSchema = HouseholdSchema.omit({ id: true, createdAt: true, updatedAt: true }).openapi(
  "HouseholdCreate"
);

export const HouseholdUpdateSchema = HouseholdCreateSchema.partial().openapi("HouseholdUpdate");
