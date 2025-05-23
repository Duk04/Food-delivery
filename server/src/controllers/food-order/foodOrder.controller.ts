import { Response, Request } from "express";
import { FoodOrderModel, FoodOrderStatusEnum } from "../../models";
import { Schema } from "mongoose";

type FoodOrderItem = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type FoodOrderBody = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItem: FoodOrderItem[];
  status: FoodOrderStatusEnum;
};

export const foodOrderController = async (req: Request, res: Response) => {
  try {
    const { user, totalPrice, foodOrderItem, status } =
      req.body as FoodOrderBody;
    if (
      !user ||
      !totalPrice ||
      !foodOrderItem ||
      !Array.isArray(foodOrderItem)
    ) {
      res.status(400).send({ message: "Aldaa" });
      return;
    }

    const newOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItem,
      status,
    });

    res.status(201).send({ message: "Order created", order: newOrder });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};
