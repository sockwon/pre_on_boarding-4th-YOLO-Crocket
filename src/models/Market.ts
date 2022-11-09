import { Market } from "../interfaces/IMarket";
import mongoose from "mongoose";

const marketSchema = new mongoose.Schema(
  {
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    nation: { type: String, required: true, unique: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<Market & mongoose.Document>(
  "Market",
  marketSchema
);
