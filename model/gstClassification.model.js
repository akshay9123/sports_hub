import mongoose from "mongoose";

const GstClassificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  hsn_sac_code: {
    type: String,
  },
  hsn_description: {
    type: String,
  },
});


// Auto-generate code ALWAYS
GstClassificationSchema.pre("save", async function (next) {
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

const GstClassification = mongoose.model("GstClassification", GstClassificationSchema);

export default GstClassification