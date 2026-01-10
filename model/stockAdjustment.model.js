import mongoose from "mongoose";

const stockAdjustmentItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemMaster",
    
  },

  adjustmentType: {
    type: String,
    enum: ["RECEIPT", "ISSUE"], // Increase / Decrease
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  unit: {
    type: String,
    default: "PCS",
  },

  rate: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
});

const stockAdjustmentSchema = new mongoose.Schema(
  {
    voucherNo: {
      type: String,
      unique: true,
      required: true,
    },

    voucherDate: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      default: "Stock Adjustment",
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    items: [stockAdjustmentItemSchema],

    totalAmount: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
    },

    attachment: {
      type: String, // file path / URL
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("StockAdjustment", stockAdjustmentSchema);
