"use server";

import * as z from "zod";

import { RegisterSchema } from "../schemas";
import axios from "axios";
import { ENDPOINTS } from "@/constants/api";

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, values);
    return { success: "Confirmation email sent!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.message || "Registration failed",
      };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
