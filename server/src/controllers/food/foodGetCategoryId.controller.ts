import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const foodGetCategoryIdController = async (
  req: Request,
  res: Response
) => {
  const { foodId } = req.params;
  if (!foodId) {
    res.status(400).send({ message: "Category ID is required" });
    return;
  }

  const foods = await FoodModel.find({ categoryName: foodId });

  if (!foods.length) {
    res.status(404).send({ message: "No foods found for this category" });
    return;
  }

  res.status(200).send([
    {
      message: "Success",
    },
    { foods: foods },
  ]);
};
