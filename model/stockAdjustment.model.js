import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemcode: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  packUnit: { type: String },
  packQuantity: { type: Number },
  unit: { type: String },
  quantity: { type: Number },
  ratePer: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  minRate: { type: Number },
  mrp: { type: Number },
  netRate: { type: Number },
  remark: { type: String },
  printDesc: { type: String },
  serviceLocation: { type: String },
  itemBarcode: { type: String },
  bdBatchNo: { type: String },
  bdMfgDate: { type: Date },
  bdExpDate: { type: Date },
  bdSaleRate: { type: Number },
  itemBalance: { type: Number },
  barcode: { type: String },
  lineLevelBarcode: { type: String },
  hsnCode: { type: String },
  brand: { type: String },
});

const stockAdjustmentSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster", // 👈 LocationMaster model
      required: true,
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // 👈 Customer model
      required: true,
    },

    voucherDate: { type: Date, required: true },
    voucherNo: { type: String, required: true, unique: true, trim: true },
    remarks: { type: String },
    attachment: { type: String },

    // 🆕 Multiple items list
    items: [itemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("StockAdjustment", stockAdjustmentSchema);
