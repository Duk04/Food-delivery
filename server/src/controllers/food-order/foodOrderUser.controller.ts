import { Request, Response } from "express";

import { FoodOrderModel } from "../../models";

export const getAllFoodOrder = async (req: Request, res: Response) => {
  const { limit = 20, page = 0 } = req.query;

  const { userId } = req.params;

  if (!userId) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const allOrder = await FoodOrderModel.find({ user: userId })
    .populate("user")
    .populate("foodOrderItem.food")
    .limit(Number(limit))
    .skip(Number(+limit * +page));

  const total = await FoodOrderModel.countDocuments({ user: userId });
  if (!total) {
    res.status(400).send({ message: "there is no food order" });
  }
  res.status(200).send({ total, allOrder });
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJkMTFhNDdkM2ZjNDI0MmI1ODE1YTkiLCJpYXQiOjE3NDc3ODQxMDB9.EE2SF6r4wJPPzP2cxQmWiyRqVl0nIloQyQdXZeCE-L8
