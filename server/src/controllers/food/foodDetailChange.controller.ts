import { Request, Response } from "express";
import { FoodBody } from "./foodMenu.controller";
import { FoodModel } from "../../models";
export const foodDetailChangeController = async (
  req: Request,
  res: Response
) => {
  const { foodId } = req.params;
  const { foodName, price, image, ingredients, categoryName } =
    req.body as FoodBody;
  if (!foodId) {
    res.status(400).send({ message: "Food ID is required." });
    return;
  }

  const updateFoodDetail = await FoodModel.findByIdAndUpdate(foodId, {
    foodName,
    price,
    image,
    ingredients,
    categoryName,
  });
  if (!updateFoodDetail) {
    res.status(400).send({ message: "cant change detail" });
  }
  res.status(200).send({ message: "successfully changed detail" });
};
