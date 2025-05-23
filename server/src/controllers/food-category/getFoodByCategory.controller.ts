import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const getFoodsByCategory = async (req: Request, res: Response) => {
  const { foodOrderId } = req.params;
  const foods = await FoodModel.find({ categoryName: foodOrderId }).populate(
    "categoryName"
  );
  res.status(200).send({ foods });
};
