import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import type { Database } from "../config/db/database";
import { users } from "../drizzle/schema";
import type { LoginData, NewUser, UserWithToken } from "../types";
import ErrorResponse from "../utilities/errorResponse";
import { JWT } from "../lib/jwt";

export class AuthService {
  private jwt: JWT;

  constructor(private db: Database) {
    this.jwt = new JWT();
  }

  async signup(newUser: NewUser): Promise<UserWithToken> {
    const existing = await this.db.select().from(users).where(eq(users.email, newUser.email)).limit(1);

    if (existing.length > 0) {
      throw new ErrorResponse("An account with this email already exists.", 409);
    }

    const hashedPassword = await bcrypt.hash(newUser.password, await bcrypt.genSalt(10));

    const [createdUser] = await this.db
      .insert(users)
      .values({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        hashedPassword,
      })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        bio: users.bio,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!createdUser) {
      throw new ErrorResponse("Failed to create user.", 500);
    }

    const token = await this.jwt.signToken(createdUser.id, createdUser.email);

    return {
      ...createdUser,
      accessToken: {
        token,
        tokenType: "Bearer",
      },
    };
  }

  async login(credentials: LoginData): Promise<UserWithToken> {
    const [user] = await this.db.select().from(users).where(eq(users.email, credentials.email)).limit(1);

    if (!user || !(await bcrypt.compare(credentials.password, user.hashedPassword))) {
      throw new ErrorResponse("Invalid credentials.", 401);
    }

    const token = await this.jwt.signToken(user.id, user.email);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken: {
        token,
        tokenType: "Bearer",
      },
    };
  }

  async changePassword(userId: string, password: { oldPassword: string; newPassword: string }): Promise<void> {
    const [user] = await this.db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) {
      throw new ErrorResponse("User not found.", 404);
    }

    if (!(await bcrypt.compare(password.oldPassword, user.hashedPassword))) {
      throw new ErrorResponse("Current password is incorrect.", 401);
    }

    const hashedNewPassword = await bcrypt.hash(password.newPassword, await bcrypt.genSalt(10));

    await this.db
      .update(users)
      .set({
        hashedPassword: hashedNewPassword,
      })
      .where(eq(users.id, userId));
  }
}
