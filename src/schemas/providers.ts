import { z } from "@hono/zod-openapi";

import { providerTypes } from "~/constants";

export const ProviderSchema = z
  .object({
    id: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    householdId: z.uuid().openapi({ example: "123e4567-e89b-12d3-a456-426614174000" }),
    providerType: z.enum(providerTypes).openapi({ example: "natural_gas" }),
    name: z.string().openapi({ example: "Gas Inc." }),
    accountNumber: z
      .string()
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "1234567890" }),
    websiteUrl: z
      .union([z.url(), z.literal("")])
      .nullable()
      .transform((v) => v?.trim() || null)
      .openapi({ example: "https://provider.com" }),
    isActive: z.boolean().openapi({ example: true }),
    createdAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
    updatedAt: z.iso.datetime().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  })
  .openapi("Provider");

export const ProviderCreateSchema = ProviderSchema.omit({ id: true, createdAt: true, updatedAt: true }).openapi(
  "ProviderCreate"
);

export const ProviderUpdateSchema = ProviderCreateSchema.partial().openapi("ProviderUpdate");
