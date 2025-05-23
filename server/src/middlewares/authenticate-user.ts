import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models";
import { verifyToken, generateNewToken } from "../utils";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.split(" ")[1];
  if (!authorization) {
    res
      .status(400)
      .send({ message: "Unauthorized user. Authorization token is inviled" });
    return;
  }

  if (!token) {
    res
      .status(400)
      .send({ message: "Unautherized user. Authorization token is missing" });
    return;
  }

  const decodedToken = verifyToken(token) as { userId: string };

  if (!decodedToken || !decodedToken.userId) {
    res
      .status(400)
      .send({ message: "Unuathorized user. Bad request or token is inviler" });
    return;
  }

  const existingUser = await UserModel.findById(decodedToken.userId);

  if (!existingUser) {
    res.status(400).send({ message: "User not found" });
    return;
  }

  req.body.user = existingUser;

  next();
};
