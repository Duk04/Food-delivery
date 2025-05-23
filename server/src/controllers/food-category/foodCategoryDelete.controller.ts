import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

export const FoodCategoryDelete = async (req: Request, res: Response) => {
  const { foodCategoryId } = req.params;
  const deleted = await FoodCategoryModel.findOneAndDelete({
    _id: foodCategoryId,
  });
  if (!deleted) {
    res.status(404).send({ message: "Category not found" });
    return;
  }

  res.status(200).send({ message: "Category deleted successfully" });
};
