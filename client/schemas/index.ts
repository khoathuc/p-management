import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Mininum 6 characters required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, { message: "Mininum 6 characters required" }),
  username: z.string().min(1, { message: "Name is required" }),
<<<<<<< HEAD
  // status: z.number().min(0, "Status must be a positive number"),
=======
  status: z.number().min(0, "Status must be a positive number"),
>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb
});
