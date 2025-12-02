import mongoose from "mongoose";

const StockUnitSchema = new mongoose.Schema({
  code: {
    type: String,
    requiredd: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roundoff_decimal: {
    type: String
  },
  uqc: {
    type: String
  }
});

const StockUnit = mongoose.model("StockUnit", StockUnitSchema)
export default StockUnit