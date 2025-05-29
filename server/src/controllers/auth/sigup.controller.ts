import { Request, Response } from "express";
import { UserModel } from "../../models";
import {
  encryptHash,
  generateNewToken,
  sendVerificationLink,
} from "../../utils";

type UserBody = { email: string; password: string };

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserBody;

    if (!email || !password) {
      res.status(400).send({ message: "Email or password is required" });
      return;
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: "User with this email already exists" });
      return;
    }

    const hashedPassword = encryptHash(password);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    const token = generateNewToken({ userId: newUser._id.toString() });

    await sendVerificationLink(
      `${req.protocol}://${req.get("host")}/auth/verify-user?token=${token}`,
      email
    );

    res.status(201).send({ message: "User registered successfully", token });
    return;
  } catch (error) {
    console.error("Error in signUpController:", error);
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }
};
