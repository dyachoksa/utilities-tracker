import type { Metadata } from "next";

import Link from "next/link";

import GithubButton from "~/components/elements/github-button";
import FormSignup from "~/components/forms/form-signup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create a new account",
};

export default async function Signup() {
  return (
    <Card className="w-sm max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormSignup />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">or</span>
        </div>

        <div>
          <GithubButton>Sign up with GitHub</GithubButton>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/90 underline">
            Log in
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
