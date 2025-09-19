import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { v7 as uuidV7 } from "uuid";

import { db } from "~/db";

export const auth = betterAuth({
  appName: "Utilities Tracker",

  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),

  plugins: [openAPI(), nextCookies()],

  advanced: {
    useSecureCookies: true,
    database: {
      generateId: () => uuidV7(),
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});

export const fetchUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return session.user;
};
