import mongoose from "mongoose";

const ItemMasterSchema = new mongoose.Schema({
  // BASIC INFO
  item_mode: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },

  under_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemGroup",
    required: true,
  },

  stock_unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockUnit", // 👈 model name
    required: true,
  },

  gst_classfication: {
    type: String,
  },

  //   ADVANCE INFO
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCategory",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  type: {
    type: String,
  },
  unit_option: {
    type: String,
  },
  barcode: {
    type: String,
  },
  auto_barcode: {
    type: String,
  },
  gst_applicable: {
    type: Boolean,
  },
  print_barcode: {
    type: Boolean,
  },

  // SALES CONFIG
  sale_desc: {
    type: String,
  },
  mrp: {
    type: String,
  },
  minimum_price: {
    type: String,
  },
  sales_rate: {
    type: String,
  },
  wholesale_rate: {
    type: String,
  },
  dealer_factor: {
    type: String,
  },
  rate_factor: {
    type: String,
  },
  sale_discount: {
    type: String,
  },
  sale_discount_percent: {
    type: String,
  },

  // PURCHASE CONFIG
  purch_desc: {
    type: String,
  },
  purchase_rate: {
    type: String,
  },
  purchase_ratefactor: {
    type: String,
  },
  purchase_discount: {
    type: String,
  },
  purchase_discount_percent: {
    type: String,
  },

  //   ATTRIBUTE CONFIG
  item_workflow: {
    type: String,
  },
  procurement_type: {
    type: String,
  },
  minimum_level: {
    type: String,
  },
  maximum_level: {
    type: String,
  },
  weighscale_mapping_code: {
    type: String,
  },
  rackbin_no: {
    type: String,
  },
  add_in_item_set_template: {
    type: String,
  },
  batch_wise_inventory: {
    type: Boolean,
  },
  batch_wise_rate: {
    type: Boolean,
  },
  drug_type: {
    type: String,
  },
  salt: {
    type: String,
  },
  skip_item_from_loyalty: {
    type: String,
  },
  exclude_cvss_applist: {
    type: Boolean,
  },

  //   ASK UDF AND ATTRIBUTES
  ask_udf_in_document: {
    type: String,
  },
  // SUGGEST CATEGORY ITEMS

  // ATTACHMENT
  attachment: {
    type: String, // URL or local path
    default: null,
  },
});

ItemMasterSchema.pre("save", async function (next) {
  if (this.code) return next();

  try {
    // Find last item whose code is ONLY digits
    const lastItem = await mongoose
      .model("ItemMaster")
      .findOne({ code: { $regex: /^[0-9]+$/ } })
      .sort({ code: -1 });

    let newCode = "00001";

    if (lastItem && lastItem.code) {
      const lastCodeNum = Number(lastItem.code);
      const nextCodeNum = lastCodeNum + 1;

      newCode = nextCodeNum.toString().padStart(5, "0");
    }

    this.code = newCode;
    next();
  } catch (err) {
    next(err);
  }
});

const ItemMaster = mongoose.model("ItemMaster", ItemMasterSchema);
export default ItemMaster;
