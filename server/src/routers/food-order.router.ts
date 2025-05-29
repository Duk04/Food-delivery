import { Router } from "express";
import {
  foodOrderController,
  foodOrderStatusController,
  getAllFoodOrder,
} from "../controllers/food-order";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";
import { getFoodsByCategory } from "../controllers";
import { foodOrderGetAllController } from "../controllers/food-order/foodOrderGetAll.controller";
export const FoodOrderRouter = Router();

FoodOrderRouter.route("/")
  .post(foodOrderController)
  .get(foodOrderGetAllController);
FoodOrderRouter.route("/:foodOrderId")
  .get(getFoodsByCategory)
  .patch(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodOrderStatusController
  );
FoodOrderRouter.get("/user/:userId", getAllFoodOrder);
