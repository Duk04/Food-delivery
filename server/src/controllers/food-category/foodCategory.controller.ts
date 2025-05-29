import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategorybody = {
  categoryName: string;
};
export const FoodCategoryController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const { categoryName } = req.body as FoodCategorybody;

    const existedCategory = await FoodCategoryModel.findOne({ categoryName });
    if (existedCategory) {
      res.status(400).send({ message: "existed category" });
      return;
    }
    if (!user || !categoryName) {
      res
        .status(401)
        .send({ message: "Unauthorized , Category name is required" });
      return;
    }

    const newCategory = await FoodCategoryModel.create({ categoryName });
    res.status(201).send({ message: "Category created", newCategory });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creating category:", err.message, err.stack);
    } else {
      console.error("Unknown error creating category:", err);
    }
    res.status(500).send({ message: "Internal server error" });
  }
};
