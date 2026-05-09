import { z } from "zod";
import { userRoleValues } from "../utils/user-role";

const emailSchema = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .pipe(z.email({ error: "Please provide a valid email address." }));

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    surname: z.string().trim().min(2, "Surname must be at least 2 characters."),
    email: emailSchema,
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(72, "Password must be at most 72 characters."),
    role: z.enum(userRoleValues, {
      error:
        "Role must be one of: accounting, operation, expert, worker, admin, unit_manager.",
    }),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required."),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
