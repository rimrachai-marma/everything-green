import { SignJWT, jwtVerify } from "jose";

export class JWT {
  private secretKey: Uint8Array;
  private expiresIn: string;

  constructor(secret?: string, expiresIn?: string) {
    if (!secret && !process.env.JWT_SECRET) {
      throw new Error("JWT secret is required. Provide it via constructor or set JWT_SECRET in environment variables.");
    }

    this.secretKey = new TextEncoder().encode(secret ?? process.env.JWT_SECRET!);
    this.expiresIn = expiresIn ?? process.env.JWT_EXPIRES_IN ?? "7d";
  }

  async signToken(id: string, email: string): Promise<string> {
    return await new SignJWT({ id, email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(this.expiresIn)
      .sign(this.secretKey);
  }

  async verifyToken(token: string): Promise<{ id: string; email: string } | null> {
    try {
      const { payload } = await jwtVerify(token, this.secretKey);
      return { id: payload.id as string, email: payload.email as string };
    } catch {
      return null;
    }
  }
}
