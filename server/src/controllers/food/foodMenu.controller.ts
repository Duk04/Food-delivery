import { Request, Response } from "express";
import { FoodModel } from "../../models";
export type FoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryName: string;
};

export const FoodMenuController = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, categoryName } =
      req.body as FoodBody;

    if (!foodName || !price || !image || !ingredients || !categoryName) {
      res.status(400).send({ message: "Provide all details" });
      return;
    }

    const existingFood = await FoodModel.findOne({ foodName });
    if (existingFood) {
      res.status(409).send({ message: "Food already exists" });
      return;
    }

    await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      categoryName,
    });

    res.status(201).send({ message: "Success" });
  } catch (error) {
    console.error("Error in FoodMenuController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
