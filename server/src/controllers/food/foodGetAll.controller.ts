import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const foodGetAllController = async (req: Request, res: Response) => {
  const getAllFood = await FoodModel.find({});

  if (!getAllFood) {
    res.status(400).send({ messega: "there is no food " });
    return;
  }
  res.status(200).send({ getAllFood });
};
