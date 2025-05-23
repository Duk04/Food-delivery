import { Request, Response, NextFunction } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
      if (roles.includes(user.role)) {
        next();
      } else {
        res.status(400).send({ message: "request failed" });
      }
    } catch (error) {
      res.status(500).send({
        message: "Aldaa garlaa ",
        error: error instanceof Error ? error.message : "unknown error",
      });
    }
  };
