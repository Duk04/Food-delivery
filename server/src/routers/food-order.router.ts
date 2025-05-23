import { Router } from "express";
import {
  foodOrderController,
  foodOrderStatusController,
  getAllFoodOrder,
} from "../controllers/food-order";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";
import { getFoodsByCategory } from "../controllers";
export const FoodOrderRouter = Router();

FoodOrderRouter.route("/").post(foodOrderController);
FoodOrderRouter.route("/:foodOrderId")
  .get(getFoodsByCategory)
  .patch(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodOrderStatusController
  );
FoodOrderRouter.get("/user/:userId", getAllFoodOrder);
