"use server";

import * as z from "zod";

import { LoginSchema } from "../schemas";
import axios from "axios";
import { ENDPOINTS } from "../constants/api";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axios.post(ENDPOINTS.LOGIN, { email, password });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Login failed" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
  redirect(DEFAULT_LOGIN_REDIRECT);
};
