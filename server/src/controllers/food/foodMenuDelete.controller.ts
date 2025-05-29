import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const foodMenuDeleteController = async (req: Request, res: Response) => {
  const { foodId } = req.params;

  if (!foodId) {
    res.status(400).send({ message: "Food ID is required" });
    return;
  }

  const deletedFood = await FoodModel.findByIdAndDelete(foodId);

  if (!deletedFood) {
    res.status(401).send({ message: "Food not found" });
    return;
  }

  res
    .status(200)
    .send({ message: "Food deleted successfully", food: deletedFood });
};
