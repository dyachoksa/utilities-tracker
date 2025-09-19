import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { RequestIdVariables } from "hono/request-id";
import type { Session, User } from "./auth";

export type AppBindings = {
  Variables: RequestIdVariables & { user: User | null; session: Session | null };
};

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<T, AppBindings>;

export type AppOpenAPI<T extends Schema> = OpenAPIHono<AppBindings, T>;
