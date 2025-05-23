import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type CategoryChangeType = {
  categoryName: string;
};

export const categorieChangeController = async (
  req: Request,
  res: Response
) => {
  const { categoryName } = req.body as CategoryChangeType;
  const { foodCategoryId } = req.params;

  if (!foodCategoryId) {
    res.status(400).send({ message: "Category ID is required!" });
    return;
  }
  if (!categoryName || categoryName.trim() === "") {
    res.status(400).send({ message: "Category name cannot be empty!" });
    return;
  }

  const updatedCategory = await FoodCategoryModel.findByIdAndUpdate(
    foodCategoryId,
    { categoryName },
    { new: true }
  );

  if (!updatedCategory) {
    res.status(404).send({ message: "Category not found!" });
    return;
  }

  res.status(200).send({
    message: "Successfully changed category name",
    category: updatedCategory,
  });
};
