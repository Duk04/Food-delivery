import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "../database";
import {
  authRouter,
  FoodCategoryRouther,
  foodRouter,
  FoodOrderRouter,
} from "./routers";
import cors from "cors";
const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/food-category", FoodCategoryRouther);
app.use("/food", foodRouter);
app.use("/food-order", FoodOrderRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
