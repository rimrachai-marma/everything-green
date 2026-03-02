import { eq } from "drizzle-orm";

import type { Database } from "../config/db/database";
import { users } from "../drizzle/schema";
import ErrorResponse from "../utilities/errorResponse";
import type { UpdateUser } from "../types";

export class UserService {
  constructor(private db: Database) {}

  profile = async (userId: string) => {
    const [user] = await this.db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) {
      throw new ErrorResponse("User not found.", 404);
    }

    return user;
  };

  updateProfile = async (userId: string, updates: UpdateUser) => {
    const [updatedUser] = await this.db.update(users).set(updates).where(eq(users.id, userId)).returning({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

    if (!updatedUser) {
      throw new ErrorResponse("Failed to update user profile.", 500);
    }

    return updatedUser;
  };

  deleteAccount = async (userId: string) => {
    const [deletedUser] = await this.db.delete(users).where(eq(users.id, userId)).returning({ id: users.id });

    if (!deletedUser) {
      throw new ErrorResponse("User not found.", 404);
    }

    return { message: "Account deleted successfully." };
  };
}
