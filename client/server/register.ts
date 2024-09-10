<<<<<<< HEAD
=======
"use server";

>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb
import * as z from "zod";

import { RegisterSchema } from "../schemas";
import axios from "axios";
import { ENDPOINTS } from "@/constants/api";

<<<<<<< HEAD
=======
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb
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
