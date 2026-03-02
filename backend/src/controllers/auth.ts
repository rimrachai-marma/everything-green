import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { AuthService } from "../services/auth";
import { db } from "../config/db/database";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(db);
  }

  signup = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await this.authService.signup({
      firstName,
      lastName,
      email,
      password,
    });

    res.cookie("user_token", user.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: "success",
      message: "Registration successful!",
      data: user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.authService.login({ email, password });

    res.cookie("user_token", user.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      status: "success",
      message: "Logged in successfully",
      data: user,
    });
  });

  logout = asyncHandler(async (_: Request, res: Response) => {
    res.clearCookie("user_token");

    res.json({
      status: "success",
      message: "Logged out successfully",
    });
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    await this.authService.changePassword(req.user!.id, { oldPassword: currentPassword, newPassword });

    res.json({
      status: "success",
      message: "Password changed successfully",
    });
  });
}
