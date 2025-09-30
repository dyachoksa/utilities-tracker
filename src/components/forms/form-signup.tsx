"use client";

import type { SignupData } from "~/types/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { signUp } from "~/lib/auth-client";
import { SignupSchema } from "~/schemas/auth";

export default function FormSignup() {
  const router = useRouter();
  const t = useTranslations("auth.sign-up");

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signUp.email(data);
    if (result.error) {
      toast.error(t("feedback.error.title"), {
        description: result.error.message || t("feedback.error.description"),
      });
      return;
    }

    toast.success(t("feedback.success.title"), { description: t("feedback.success.description") });
    router.push("/app/dashboard");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputText
          control={form.control}
          name="name"
          label={t("form.name.label")}
          placeholder={t("form.name.placeholder")}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Button type="submit" className="w-full">
          {t("actions.signup")}
        </Button>
      </form>
    </Form>
  );
}
