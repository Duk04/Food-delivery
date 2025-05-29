import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models";
import { verifyToken } from "../utils";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({
      message: "Unauthorized: Authorization token is missing or malformed",
    });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = verifyToken(token) as { userId: string };

    if (!decodedToken || !decodedToken.userId) {
      res.status(401).send({ message: "Unauthorized: Invalid token payload" });
      return;
    }

    const existingUser = await UserModel.findById(decodedToken.userId);

    if (!existingUser) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    req.body.user = existingUser;

    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
    return;
  }
};
