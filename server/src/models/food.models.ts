import { Schema, model, models, Model, Types } from "mongoose";

type FoodSchemeType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryName: Types.ObjectId[];
};

const FoodSchema = new Schema<FoodSchemeType>(
  {
    foodName: { type: String, required: true, unique: true, default: "" },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true, default: "" },
    ingredients: { type: String, required: true, default: "" },
    categoryName: [{ type: Types.ObjectId, ref: "Category", required: true }],
  },
  { timestamps: true }
);
export const FoodModel: Model<FoodSchemeType> =
  models["Food"] || model("Food", FoodSchema);
