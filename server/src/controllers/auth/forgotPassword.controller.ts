import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateNewTokenPass, sendVerificationLinkPass } from "../../utils";

type UserEmail = {
  email: string;
};

export const ResetPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body as UserEmail;

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res
      .status(400)
      .send({ message: "User not exists, pls create a new profile" });
    return;
  }

  const token = generateNewTokenPass({ userId: existingUser._id });

  const resetLink = `${req.protocol}://${req.get(
    "host"
  )}/auth/verify-reset-password-request?token=${token}`;

  await sendVerificationLinkPass(resetLink, email);

  // res.redirect(
  //   `${process.env.FRONTEND_ENDPOINT}/reset-password?token=${token}`
  // );

  res.status(200).send({ message: "success" });
};

//ene suuleese 2 doh
