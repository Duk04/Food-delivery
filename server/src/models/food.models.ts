import { Schema, model, models, Model } from "mongoose";

type FoodSchemeType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryName: Schema.Types.ObjectId[];
};

const FoodSchema = new Schema<FoodSchemeType>(
  {
    foodName: { type: String, required: true, unique: true, default: "" },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, required: true, default: "" },
    ingredients: { type: String, required: true, default: "" },
    categoryName: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
  },
  { timestamps: true }
);
export const FoodModel: Model<FoodSchemeType> =
  models["Food"] || model("Food", FoodSchema);
