import type { AppBindings } from "~/types/api";

import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "stoker/openapi";

export const createRouter = () => {
  return new OpenAPIHono<AppBindings>({ strict: true, defaultHook });
};
