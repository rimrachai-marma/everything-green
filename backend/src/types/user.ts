import type { users } from "../drizzle/schema";
import type { Token } from "./auth";

export type User = Omit<typeof users.$inferSelect, "hashedPassword">;

export type NewUser = Omit<typeof users.$inferInsert, "hashedPassword"> & {
  password: string;
};

export type UpdateUser = Partial<Omit<typeof users.$inferInsert, "hashedPassword" | "id" | "createdAt">> & {
  password?: string;
};

export type UserWithToken = User & {
  accessToken: Token;
};
