import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategorybody = {
  categoryName: string;
};
export const FoodCategoryController = async (req: Request, res: Response) => {
  const { categoryName } = req.body as FoodCategorybody;

  const existedCategory = await FoodCategoryModel.findOne({ categoryName });
  if (existedCategory) {
    res.status(404).send({ message: "existed food category" });
  }
  if (!categoryName || categoryName.trim() === "") {
    res.status(400).send({ message: "Please write category name" });
  }
  const categoryId = await FoodCategoryModel.create({ categoryName });
  res
    .status(201)
    .send({ message: "Cateogry successsfuly created", categoryId });
};
