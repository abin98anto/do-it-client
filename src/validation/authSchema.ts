import { z } from "zod";

const emailSchema = z
  .string()
  .nonempty("Email is required")
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .nonempty("Password is required")
  .min(6, "Password must be 6+ characters");

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("Full name is required")
      .min(2, "Full name must be 2+ characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const taskSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  title: z
    .string()
    .nonempty("Title is required")
    .min(2, "Title must be 2+ characters"),
  description: z.string().nonempty("Description is required"),
  dueDate: z.date(),
  status: z.enum(["pending", "completed", "deleted"]),
});
