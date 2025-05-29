import { Router } from "express";
import {
  foodDetailChangeController,
  foodGetAllController,
  foodGetCategoryIdController,
  FoodMenuController,
  foodMenuDeleteController,
} from "../controllers/food";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const foodRouter = Router();

foodRouter
  .route("/food-menu")
  .post(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    FoodMenuController
  );
foodRouter.get("/", foodGetAllController);

foodRouter
  .route("/:foodId")
  .delete(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodMenuDeleteController
  )
  .patch(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodDetailChangeController
  );
foodRouter.get("/all", foodGetCategoryIdController);
