import { Request, Response } from "express";
import { FoodCategoryModel, FoodModel } from "../../models";

export const foodGetCategoryIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const allCategories = await FoodCategoryModel.find();
    const foods = await FoodModel.find();

    const allFilteredFoods = allCategories.map(({ _id, categoryName }) => {
      const categoryFoods = foods.filter(({ categoryName: foodCategories }) =>
        foodCategories.some((category) => String(category) === String(_id))
      );
      return {
        _id,
        categoryFoods,
        categoryName,
      };
    });

    if (!allFilteredFoods.length) {
      res.status(404).json({ message: "No foods found" });
      return;
    }

    res.status(200).send({ allFilteredFoods });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
