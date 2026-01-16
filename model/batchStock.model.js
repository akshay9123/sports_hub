import mongoose from "mongoose";

const batchStockSchema = new mongoose.Schema(
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

    batchNo: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number },

    receivedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

batchStockSchema.index({ item: 1, store: 1, batchNo: 1 }, { unique: true });

export default mongoose.model("BatchStock", batchStockSchema);
