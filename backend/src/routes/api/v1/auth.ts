import { Router } from "express";
import { AuthController } from "../../../controllers/auth";
import { validateRequestBody } from "../../../middleware/validation";
import { changePasswordSchema, loginSchema, signupSchema } from "../../../lib/schemas/auth";
import { auth } from "../../../middleware/auth";

const router = Router();
const authController = new AuthController();

/**
 * @route   POST /api/auth/register
 * @desc    Sign up a new user
 * @access  Public
 */
router.post("/signup", validateRequestBody(signupSchema), authController.signup);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", validateRequestBody(loginSchema), authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post("/logout", auth, authController.logout);

/**
 * @route   PATCH /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.patch("/change-password", auth, validateRequestBody(changePasswordSchema), authController.changePassword);

export default router;
