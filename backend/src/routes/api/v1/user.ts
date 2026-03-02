import { Router } from "express";
import { UserController } from "../../../controllers/user";
import { auth } from "../../../middleware/auth";
import { validateRequestBody } from "../../../middleware/validation";
import { changeEmailSchema, userUpdateSchema } from "../../../lib/schemas/user";

const router = Router();
const userController = new UserController();

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get("/profile", auth, userController.profile);

/**
 * @route   PATCH /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.patch("/profile", auth, validateRequestBody(userUpdateSchema), userController.updateProfile);

router.patch("/email-update", auth, validateRequestBody(changeEmailSchema), userController.updateProfile);

/**
 * @route   DELETE /api/user/delete
 * @desc    Delete user account
 * @access  Private
 */
router.delete("/delete", auth, userController.deleteAccount);

export default router;
