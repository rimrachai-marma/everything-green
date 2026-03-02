import type { Request, Response } from "express";

import { db } from "../config/db/database";
import asyncHandler from "../middleware/asyncHandler";
import { UserService } from "../services/user";
import type { UpdateUser } from "../types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(db);
  }

  profile = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.profile(req.user!.id);

    res.json({
      status: "success",
      message: "User profile retrieved successfully",
      data: user,
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, bio, avatarUrl } = req.body;

    const updates: UpdateUser = {
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(email !== undefined && { email }),
      ...(bio !== undefined && { bio }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    };

    const updatedUser = await this.userService.updateProfile(req.user!.id, updates);

    res.json({
      status: "success",
      message: "User profile updated successfully",
      data: updatedUser,
    });
  });

  deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    await this.userService.deleteAccount(req.user!.id);

    res.json({
      status: "success",
      message: "Account deleted successfully",
    });
  });
}
