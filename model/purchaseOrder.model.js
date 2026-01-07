import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema({
  gstType: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LocationMaster", // 👈 LocationMaster model
    required: true,
  },
  vendor:{
    type: String,
    required: true
  }
});
