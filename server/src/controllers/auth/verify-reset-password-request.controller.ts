import { Request, Response } from "express";
import { verifyTokenPass } from "../../utils";
import { UserModel } from "../../models";

export const verifyUserPasswordController = async (
  req: Request,
  res: Response
) => {
  const token = String(req.query.token);

  const decodedToken = verifyTokenPass(token) as { userId: string };

  const existedUser = await UserModel.findById(decodedToken.userId);
  if (!existedUser) {
    res.status(400).send({ message: "User not existed, Create a new prifle" });
    return;
  }

  res.redirect(
    `${process.env.FRONTEND_ENDPOINT}/reset-password?token=${token}`
  );
};
//ene suulchiih
