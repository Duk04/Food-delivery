import { Router } from "express";

import {
  categorieChangeController,
  FoodCategoryController,
} from "../controllers/food-category";
import { FoodCategoryDelete } from "../controllers/food-category";
import { getAllFoodCategoriesController } from "../controllers/food-category/AllFoodCategory.controller";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const FoodCategoryRouther = Router();
FoodCategoryRouther.route("/")
  .post(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    FoodCategoryController
  )
  .get(getAllFoodCategoriesController);

FoodCategoryRouther.route("/:foodCategoryId")
  .delete(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    FoodCategoryDelete
  )
  .patch(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    categorieChangeController
  );
