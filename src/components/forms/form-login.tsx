"use client";

import type { LoginData } from "~/types/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputCheckbox } from "~/components/inputs/input-checkbox";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { signIn } from "~/lib/auth-client";
import { LoginSchema } from "~/schemas/auth";

export default function FormLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("auth.login");

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signIn.email(data);
    if (result.error) {
      toast.error(t("feedback.error.title"), {
        description: result.error.message || t("feedback.error.description"),
      });
      return;
    }

    toast.success(t("feedback.success.title"), { description: t("feedback.success.description") });
    router.push(searchParams.get("next") || "/app/dashboard");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputText
          control={form.control}
          type="email"
          name="email"
          label={t("form.email.label")}
          placeholder="user@example.com"
          autoComplete="username"
        />
        <InputText
          control={form.control}
          type="password"
          name="password"
          label={t("form.password.label")}
          placeholder={t("form.password.placeholder")}
          autoComplete="current-password"
        />
        <InputCheckbox control={form.control} name="rememberMe" label={t("form.rememberMe.label")} />
        <Button type="submit" className="w-full">
          {t("actions.login")}
        </Button>
      </form>
    </Form>
  );
}
