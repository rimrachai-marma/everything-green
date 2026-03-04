import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { AuthService } from "../services/auth";
import { db } from "../config/db/database";
import { sendSuccessMutation } from "../utilities/response";

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

    sendSuccessMutation(res, "Registration successful!", user, 201);
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

    sendSuccessMutation(res, "Logged in successfully", user);
  });

  logout = asyncHandler(async (_: Request, res: Response) => {
    res.clearCookie("user_token");

    res.json({
      status: "success",
      message: "Logged out successfully",
    });

    sendSuccessMutation(res, "Logged out successfully", undefined, 204);
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    await this.authService.changePassword(req.user!.id, { oldPassword: currentPassword, newPassword });

    sendSuccessMutation(res, "Password changed successfully");
  });
}
