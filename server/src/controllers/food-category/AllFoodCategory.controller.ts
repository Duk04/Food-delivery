import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

export const getAllFoodCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await FoodCategoryModel.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch categories" });
  }
};
