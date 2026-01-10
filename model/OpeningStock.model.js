import mongoose from "mongoose";

const openingStockItemSchema = new mongoose.Schema({
  itemcode: { type: String, required: true },
  description: { type: String },
  batchNo: { type: String },
  packQty: { type: Number },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  saleRate: { type: Number },
  wholesaleRate: { type: Number },
  dealerRate: { type: Number },
  mrp: { type: Number },
  amount: { type: Number },
  itemBalance: { type: Number },
});

const openingStockSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },

    category: {
      type: String,
      default: "Opening Stock",
    },

    voucherDate: { type: Date, required: true },
    voucherNo: { type: String, unique: true },

    items: [openingStockItemSchema],

    remarks: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("OpeningStock", openingStockSchema);
