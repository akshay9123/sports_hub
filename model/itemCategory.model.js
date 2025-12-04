import mongoose from "mongoose";

const itemCategorySchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    // <-- NEW FIELD
    type: String, // yaha image ka URL store hoga
  },
});

// Auto-generate code
itemCategorySchema.pre("save", async function (next) {
  const lastDoc = await this.constructor.findOne().sort({ code: -1 });

  let nextCode = "0001";
  if (lastDoc && lastDoc.code) {
    const lastNum = parseInt(lastDoc.code);
    nextCode = String(lastNum + 1).padStart(4, "0");
  }

  this.code = nextCode;
  next();
});

const ItemCategory = mongoose.model("ItemCategory", itemCategorySchema);
export default ItemCategory;
