import type { AppRoutes } from "~/types/api";

import { hc } from "hono/client";

export type Client = ReturnType<typeof hc<AppRoutes>>;

export const hcWithType = (...args: Parameters<typeof hc<AppRoutes>>): Client => hc<AppRoutes>(...args);

export const api = hcWithType("/api", { init: { credentials: "include" }, fetch });
