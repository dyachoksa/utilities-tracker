import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

import GithubButton from "~/components/elements/github-button";
import FormSignup from "~/components/forms/form-signup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("auth.sign-up.title"),
    description: t("auth.sign-up.description"),
  };
}

export default async function Signup() {
  const t = await getTranslations();

  return (
    <Card className="w-sm max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t("auth.sign-up.title")}</CardTitle>
        <CardDescription>{t("auth.sign-up.description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormSignup />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">{t("common.misc.or")}</span>
        </div>

        <div>
          <GithubButton>{t("auth.sign-up.actions.signupWithGithub")}</GithubButton>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-700">
          {t("auth.sign-up.login.hint")}{" "}
          <Link href="/login" className="text-primary hover:text-primary/90 underline">
            {t("auth.sign-up.login.action")}
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
