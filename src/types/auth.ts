import { z } from "zod";

import { auth } from "~/lib/auth";
import { LoginSchema, SignupSchema } from "~/schemas/auth";

export type User = typeof auth.$Infer.Session.user;

export type Session = typeof auth.$Infer.Session.session;

export type LoginData = z.infer<typeof LoginSchema>;

export type SignupData = z.infer<typeof SignupSchema>;
