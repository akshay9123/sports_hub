import mongoose from "mongoose";


const salespricelistSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price_category: {
    type: String,
    required: true,
  },
  store: {
    type: String,
  },
  brand: {
    type: String,
  },
  effective_from: {
    type: Date,
    required: true,
  },
});


const SalesPriceList = mongoose.model("SalesPriceList", salespricelistSchema)

export default SalesPriceList