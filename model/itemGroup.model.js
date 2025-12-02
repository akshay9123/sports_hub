import mongoose from "mongoose";

const ItemGroupSchema = new mongoose.Schema({
  // BASIC INFO
  item_group_mode: {
    type: String,
  },
  item_name: {
    type: String,
    required: true,
  },
  under_group: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  item_desc: {
    type: String,
  },

  // ITEM DEFAULT
  item_type: {
    type: String,
  },
  unit_option: {
    type: String,
  },
  stock_unit: {
    type: String,
    required: true,
  },
  gst_classification: {
    type: String,
  },
  sales_gl: {
    type: String,
  },
  purchase_gl: {
    type: String,
  },
  maximum_level: {
    type: String,
  },
  rate_factor: {
    type: String,
  },
  item_type: {
    type: String,
  },
  drug_type: {
    type: String,
  },
  purchase_rate_factor: {
    type: String,
  },
  batch_wise_inventory: {
    type: Boolean,
  },
  batch_wise_rate: {
    type: Boolean,
  },
  exclude_from_cvss: {
    type: Boolean,
  },
});


const ItemGroup = mongoose.model("ItemGroup", ItemGroupSchema)
export default ItemGroup
      