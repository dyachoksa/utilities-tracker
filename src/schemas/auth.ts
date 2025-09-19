import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export const SignupSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
});
