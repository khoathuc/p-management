"use client";
import React, { startTransition, useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { LoginSchema, NewPasswordSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { newPassword } from "../../actions/new-password";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // ============================================================
  // NOTE: SERVER ACTIONS REQUEST SUBMIT FORM FOR NEW PASSWORD
  // ============================================================
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    // setError("");
    // setSuccess("");
    // startTransition(() => {
    //   newPassword(values, token).then((data) => {
    //     if (data) {
    //       setError(data?.error);
    //       setSuccess(data?.success);
    //     }
    //   });
    // });
  };
  return (
    <CardWrapper
      headerLabel="Enter new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      // showSocial
    >
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2 text-destructive mb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full text-white"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default NewPasswordForm;
