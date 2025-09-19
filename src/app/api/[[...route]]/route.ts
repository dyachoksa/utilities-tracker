import { Scalar } from "@scalar/hono-api-reference";
import { except } from "hono/combine";
import { requestId } from "hono/request-id";
import { handle } from "hono/vercel";
import { notFound } from "stoker/middlewares";

import { onError } from "~/api/middlewares/on-error";
import { requireSession } from "~/api/middlewares/require-session";
import { createRouter } from "~/lib/create-router";

const app = createRouter().basePath("/api");

app.use(requestId()).use(except(["/api/docs", "/api/schema", "/api/health"], requireSession()));

app.notFound(notFound);
app.onError(onError);

app.doc31("/schema", {
  openapi: "3.1.0",
  info: { title: "Utilities Tracker API", version: "1.0.0" },
});

app.get(
  "/docs",
  Scalar({
    title: "Utilities Tracker API",
    pageTitle: "Utilities Tracker API",
    defaultHttpClient: { targetKey: "js", clientKey: "fetch" },
    sources: [
      { url: "/api/schema", title: "API" },
      { url: "/api/auth/open-api/generate-schema", title: "Auth" },
    ],
  })
);

app.get("/health", (c) => c.json({ status: "ok", message: "Service is running", success: true }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
