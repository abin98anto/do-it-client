import { z } from 'zod';

// Reusable email schema
const emailSchema = z
  .string()
  .nonempty('Email is required')
  .email('Invalid email address');

// Reusable password schema
const passwordSchema = z
  .string()
  .nonempty('Password is required')
  .min(6, 'Password must be 6+ characters');

// Signup schema
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .nonempty('Full name is required')
      .min(2, 'Full name must be 2+ characters'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().nonempty('Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});