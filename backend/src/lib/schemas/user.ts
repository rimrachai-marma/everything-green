import { z } from "zod";

export const userUpdateSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(100, "First name is too long").optional(),
    lastName: z.string().min(1, "Last name is required").max(100, "Last name is too long").optional(),
    bio: z.string().max(500, "Bio is too long").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const changeEmailSchema = z.object({
  email: z.email("Invalid email address"),
});
