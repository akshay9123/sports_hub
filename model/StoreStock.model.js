import mongoose from "mongoose";

const storeStockSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemMaster",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

storeStockSchema.index({ item: 1, store: 1 }, { unique: true });


// export default mongoose.model("StoreStock", storeStockSchema);
export default mongoose.models.StoreStock ||
  mongoose.model("StoreStock", storeStockSchema);