import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "stoker/openapi";

export const createRouter = () => {
  return new OpenAPIHono({ strict: true, defaultHook });
};
