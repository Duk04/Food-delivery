import { Request, Response } from "express";
import { UserModel } from "../../models";
import { decryptHash } from "../../utils";
type UserBody = { email: string; password: string };
export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;
  const existedUserEmail = await UserModel.findOne({ email });

  if (!existedUserEmail) {
    res.status(400).send({ message: "Iim emailtai burtgel baihgu bn" });
    return;
  }

  const passworIsMatch = decryptHash(password, existedUserEmail.password);

  if (!passworIsMatch) {
    res
      .status(400)
      .send({ message: "Iim email passwordtoi burtgel baihgu bn" });
    return;
  }

  res.status(201).send({ message: "Successfully" });
};
