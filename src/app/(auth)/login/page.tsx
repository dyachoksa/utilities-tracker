import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

import GithubButton from "~/components/elements/github-button";
import FormLogin from "~/components/forms/form-login";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("auth.login.title"),
    description: t("auth.login.description"),
  };
}

export default async function Login() {
  const t = await getTranslations();

  return (
    <Card className="w-sm max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t("auth.login.title")}</CardTitle>
        <CardDescription>{t("auth.login.description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormLogin />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">{t("common.misc.or")}</span>
        </div>

        <div>
          <GithubButton>{t("auth.login.actions.loginWithGithub")}</GithubButton>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-700">
          {t("auth.login.sign-up.hint")}{" "}
          <Link href="/signup" className="text-primary hover:text-primary/90 underline">
            {t("auth.login.sign-up.action")}
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
