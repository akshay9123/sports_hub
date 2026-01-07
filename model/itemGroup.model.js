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
  stock_unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockUnit", // 👈 model name
    required: true,
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


ItemGroupSchema.pre("save", async function (next) {
  if (this.code) return next();

  try {
    // Find last item whose code is ONLY digits
    const lastItem = await mongoose
      .model("ItemGroup")
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

const ItemGroup = mongoose.model("ItemGroup", ItemGroupSchema)
export default ItemGroup
      