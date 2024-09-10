"use client";
import React, { startTransition, useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { RegisterSchema } from "../../schemas";
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
<<<<<<< HEAD
=======
import { login } from "../../actions/login";
>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb
import { register } from "../../server/register";
import { Spinner } from "../spinner";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  // ============================================================
  // NOTE: SERVER ACTIONS REQUEST SUBMIT FORM FOR REGISTER
  // ============================================================

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        // Set an additional 3-second delay for the pending state
        setTimeout(() => {
          // After 3 seconds, the pending state will stop
        }, 3000);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-2 text-destructive mb-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Nicolas William"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="user@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs">
                    Password
                  </FormLabel>
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
          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-white"
          >
            {isPending ? (
              <>
                <Spinner className="mr-2" />
              </>
            ) : (
              "Create an account"
            )}
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
