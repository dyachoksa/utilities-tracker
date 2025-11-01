import type { NextRequest } from "next/server";

import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // Pre-check for session cookie existence
  // If session cookie does not exist, redirect to login
  // Actual session check is done on the page level
  if (!sessionCookie) {
    return NextResponse.redirect(new URL(`/login?next=${request.nextUrl.pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/((?!docs|schema|health).*)"],
};
