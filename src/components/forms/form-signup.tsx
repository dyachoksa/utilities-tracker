"use client";

import type { SignupData } from "~/types/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputText from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { signUp } from "~/lib/auth-client";
import { SignupSchema } from "~/schemas/auth";

export default function FormSignup() {
  const router = useRouter();

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signUp.email(data);
    if (result.error) {
      toast.error("Cat't create account", {
        description: result.error.message || "We are experiencing issues. Please try again later.",
      });
      return;
    }

    toast.success("Account created", { description: "Your account has been successfully created." });
    router.push("/app/dashboard");
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputText control={form.control} name="name" label="Name" placeholder="John Doe" autoComplete="name" />
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
          autoComplete="new-password"
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </Form>
  );
}
