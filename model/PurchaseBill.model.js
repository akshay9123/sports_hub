import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemMaster",
    required: true,
  },
  itemcode: String,
  description: String,
  batchNo: String,
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: Number,
  itemBalance: Number,
});

const purchaseBillSchema = new mongoose.Schema(
  {
    billNo: { type: String, unique: true },
    billDate: { type: Date, required: true },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    //   required: true,
    },

    items: [purchaseItemSchema],

    logistics: {
      freight: { type: Number, default: 0 },
      loadingUnloading: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      otherCharges: { type: Number, default: 0 },
    },

    remarks: String,
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseBill", purchaseBillSchema);
