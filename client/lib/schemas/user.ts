import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const emailSchema = z.object({
  newEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
