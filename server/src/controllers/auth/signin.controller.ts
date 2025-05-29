import { Request, Response } from "express";
import { UserModel } from "../../models";
import { decryptHash, generateNewToken } from "../../utils";

type UserBody = { email: string; password: string };

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(400).send({ message: "Iim emailtai burtgel baihgu bn" });
    return;
  }

  const passwordIsMatch = decryptHash(password, existingUser.password);
  if (!passwordIsMatch) {
    res
      .status(400)
      .send({ message: "Iim email passwordtoi burtgel baihgu bn" });
    return;
  }

  const token = generateNewToken({ userId: existingUser._id.toString() });

  res.status(200).send({ message: "Successfully", token });
};
