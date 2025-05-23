import { Request, Response } from "express";
import { verifyToken } from "../../utils";
import { UserModel } from "../../models";

export const verifyUserController = async (req: Request, res: Response) => {
  try {
    const token = String(req.query.token);
    if (!token) {
      res.status(400).send({ message: "Token is required" });
      return;
    }

    const decodedToken = verifyToken(token) as { userId?: string };
    if (!decodedToken?.userId) {
      res.status(400).send({ message: "Invalid token" });
      return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      decodedToken.userId,
      {
        ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
        isVerified: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.redirect(`${process.env.FRONTEND_ENDPOINT}/login`);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};
