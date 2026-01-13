// import mongoose from "mongoose";

// const stockAdjustmentItemSchema = new mongoose.Schema({
//   item: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ItemMaster",
//   },

//   adjustmentType: {
//     type: String,
//     enum: ["RECEIPT", "ISSUE"], // Increase / Decrease
//     required: true,
//   },

//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//   },

//   unit: {
//     type: String,
//     default: "PCS",
//   },

//   rate: {
//     type: Number,
//     required: true,
//   },

//   amount: {
//     type: Number,
//     required: true,
//   },
//   barcode: { type: String },
//   print_barcode: { type: Boolean },
//   brand: { type: mongoose.Schema.Types.ObjectId, ref: "ItemBrand" },
//   gst_classfication: { type: String },
//   net_rate:{
//     type: Number
//   },
// });

// const stockAdjustmentSchema = new mongoose.Schema(
//   {
//     voucherNo: {
//       type: String,
//       unique: true,
//       required: true,
//     },

//     voucherDate: {
//       type: Date,
//       required: true,
//     },

//     category: {
//       type: String,
//       default: "Stock Adjustment",
//     },

//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Store",
//       required: true,
//     },

//     party: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//     },

//     items: [stockAdjustmentItemSchema],

//     totalAmount: {
//       type: Number,
//       default: 0,
//     },

//     remarks: {
//       type: String,
//     },

//     attachment: {
//       type: String, // file path / URL
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("StockAdjustment", stockAdjustmentSchema);




import mongoose from "mongoose";

const stockAdjustmentItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemMaster",
    required: true,
  },
  adjustmentType: { type: String, enum: ["RECEIPT", "ISSUE"], required: true },
  quantity: { type: Number, min: 1, required: true },
  rate: { type: Number }, // auto-picked
  amount: { type: Number },
  reason: { type: String },
});

const stockAdjustmentSchema = new mongoose.Schema(
  {
    voucherNo: { type: String, unique: true, required: true },
    voucherDate: { type: Date, required: true },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },
    items: [stockAdjustmentItemSchema],
    remarks: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("StockAdjustment", stockAdjustmentSchema);
