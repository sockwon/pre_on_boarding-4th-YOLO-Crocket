import { Product } from "../interfaces/IProduct";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    product_name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    order_deadline: { type: String, required: true },
    nation: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<Product & mongoose.Document>(
  "Product",
  productSchema
);
