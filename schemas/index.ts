import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().min(1, { message: "Must not be empty" })),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
