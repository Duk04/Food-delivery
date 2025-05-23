import { Router } from "express";

import {
  signUpController,
  verifyUserController,
  signInController,
  ResetUserPasswordController,
  ResetPasswordController,
  verifyUserPasswordController,
} from "../controllers";

export const authRouter = Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-in", signInController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/reset-password-request", ResetPasswordController);
authRouter.get("/verify-reset-password-request", verifyUserPasswordController);
authRouter.post("/reset-password", ResetUserPasswordController);
