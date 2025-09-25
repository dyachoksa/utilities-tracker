import type { ProviderCreateSchema, ProviderSchema, ProviderUpdateSchema } from "~/schemas/providers";

import { z } from "@hono/zod-openapi";

export type Provider = z.infer<typeof ProviderSchema>;

export type ProviderCreateData = z.infer<typeof ProviderCreateSchema>;

export type ProviderUpdateData = z.infer<typeof ProviderUpdateSchema>;
