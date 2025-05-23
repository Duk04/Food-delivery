import { Request, Response } from "express";
import { FoodOrderModel, FoodOrderStatusEnum } from "../../models";

export const foodOrderStatusController = async (
  req: Request,
  res: Response
) => {
  const { foodOrderId } = req.params;
  const { status } = req.body;

  if (!Object.values(FoodOrderStatusEnum).includes(status)) {
    res.status(400).send({ message: "Invalid status value" });
    return;
  }
  const updateOrderStatus = await FoodOrderModel.findByIdAndUpdate(
    foodOrderId,
    { status },
    { new: true }
  );
  if (!updateOrderStatus) {
    res.status(404).send({ message: "order bhgu" });
  }
  res
    .status(200)
    .send({ message: "Successfully status changed", order: updateOrderStatus });
};
