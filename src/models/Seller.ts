import { Seller } from "../interfaces/ISeller";
import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller_name: { type: String, required: true, unique: true },
    account: { type: String, required: true },
    bank: { type: String, required: true },
    contact: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<Seller & mongoose.Document>(
  "Seller",
  sellerSchema
);
