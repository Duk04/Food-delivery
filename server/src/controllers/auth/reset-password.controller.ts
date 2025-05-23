// controllers/auth/reset-password.controller.ts
import { Request, Response } from "express";
import { encryptHash, verifyTokenPass } from "../../utils";
import { UserModel } from "../../models";

type NewPasswordBody = { newPassword: string; userId: number };

export const ResetUserPasswordController = async (
  req: Request,
  res: Response
) => {
  const { newPassword } = req.body as NewPasswordBody;

  if (!newPassword || newPassword.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }

  let token = typeof req.query.token === "string" ? req.query.token : "";

  const tokenPayload = verifyTokenPass(token);
  const userId =
    typeof tokenPayload === "object" &&
    tokenPayload !== null &&
    "userId" in tokenPayload
      ? (tokenPayload as { userId: number }).userId
      : undefined;

  if (!userId) {
    res.status(400).json({ message: "Token invalid or expired" });
    return;
  }

  const hashedPassword = await encryptHash(newPassword);
  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

  res.redirect(`${process.env.FRONTEND_ENDPOINT}/reset-password`);
  return;
};
