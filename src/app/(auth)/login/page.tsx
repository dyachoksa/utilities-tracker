import type { Metadata } from "next";

import Link from "next/link";

import GithubButton from "~/components/elements/github-button";
import FormLogin from "~/components/forms/form-login";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your account to continue",
};

export default async function Login() {
  return (
    <Card className="w-sm max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>Log in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormLogin />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">or</span>
        </div>

        <div>
          <GithubButton>Sign in with GitHub</GithubButton>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-primary/90 underline">
            Sign up
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
