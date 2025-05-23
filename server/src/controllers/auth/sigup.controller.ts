import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  encryptHash,
  generateNewToken,
  sendVerificationLink,
} from "../../utils";
type UserBody = { email: string; password: string };
export const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;
  if (!email || !password) {
    res.status(400).send({ message: "Email or password is not here" });
  }
  const existedEmail = await UserModel.findOne({ email });

  if (existedEmail) {
    res.status(400).send({ message: "Burtgeltei hereglegch bna" });
    return;
  }

  const hashPassowrd = encryptHash(password);

  const { _id } = await UserModel.create({
    email,
    password: hashPassowrd,
  });

  const token = generateNewToken({ userId: _id });
  await sendVerificationLink(
    `${req.protocol}://${req.get("host")}/auth/verify-user?token=${token}`,
    email
  );
  res.status(201).send({ message: "Success", token });
};
