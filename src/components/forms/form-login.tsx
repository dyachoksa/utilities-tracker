"use client";

import type { LoginData } from "~/types/auth";

import { zodResolver } from "@hookform/resolvers/zod";
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

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signIn.email(data);
    if (result.error) {
      toast.error("Login failed", {
        description: result.error.message || "We are experiencing issues. Please try again later.",
      });
      return;
    }

    toast.success("Welcome back!", { description: "You have successfully signed in." });
    router.push(searchParams.get("next") || "/app/dashboard");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputText
          control={form.control}
          type="email"
          name="email"
          label="Email"
          placeholder="user@example.com"
          autoComplete="username"
        />
        <InputText
          control={form.control}
          type="password"
          name="password"
          label="Password"
          placeholder="Your password"
          autoComplete="current-password"
        />
        <InputCheckbox control={form.control} name="rememberMe" label="Remember me" />
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </Form>
  );
}
