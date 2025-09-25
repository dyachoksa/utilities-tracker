import type { auth } from "~/lib/auth";
import type { LoginSchema, SignupSchema } from "~/schemas/auth";

import { z } from "@hono/zod-openapi";

export type User = typeof auth.$Infer.Session.user;

export type Session = typeof auth.$Infer.Session.session;

export type LoginData = z.infer<typeof LoginSchema>;

export type SignupData = z.infer<typeof SignupSchema>;
