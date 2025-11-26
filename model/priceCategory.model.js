import mongoose from "mongoose";

const priceCategorySchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Auto-generate code ALWAYS
priceCategorySchema.pre("save", async function (next) {
  // ALWAYS auto-generate -- user can never give code
  const lastDoc = await this.constructor.findOne().sort({ code: -1 });

  let nextCode = "0001";

  if (lastDoc && lastDoc.code) {
    const lastNum = parseInt(lastDoc.code);
    nextCode = String(lastNum + 1).padStart(4, "0");
  }

  this.code = nextCode;

  next();
});

const PriceCategory = mongoose.model("PriceCategory", priceCategorySchema);
export default PriceCategory;
