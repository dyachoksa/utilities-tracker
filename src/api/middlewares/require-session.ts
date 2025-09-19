import type { AppBindings } from "~/types/api";

import { createMiddleware } from "hono/factory";

import { auth } from "~/lib/auth";

export const requireSession = () =>
  createMiddleware<AppBindings>(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("user", session.user);
    c.set("session", session.session);

    return next();
  });
