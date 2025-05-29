import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const foodOrderGetAllController = async (
  req: Request,
  res: Response
) => {
  const order = await FoodOrderModel.find()
    .populate("user")
    .populate({ path: "foodOrderItem.food", model: "Food" });
  res.status(200).send({ order });
};
