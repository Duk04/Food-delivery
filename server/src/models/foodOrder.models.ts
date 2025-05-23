import { Schema, model, models, Model } from "mongoose";

export enum FoodOrderStatusEnum {
  PENDING = "Pending",
  CANCELLED = "Cancelled",
  DELIVERED = "Delivered",
}

type FoodOrderItemSChemaType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type FoodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItem: FoodOrderItemSChemaType[];
  status: FoodOrderStatusEnum;
};

export const FoodOrderItem = new Schema<FoodOrderItemSChemaType>(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "Food" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const FoodOderSchema = new Schema<FoodOrderSchemaType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItem: { type: [FoodOrderItem], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);
export const FoodOrderModel: Model<FoodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", FoodOderSchema);
