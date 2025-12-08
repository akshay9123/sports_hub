import mongoose from "mongoose";

const documentCategoryInventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      unique: true,
    },

    inactive: {
      type: Boolean,
      default: false, // Default Active
    },

    specificToDocument: {
      type: String,
      trim: true,
    },

    defaultLocation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


// Auto-generate code ALWAYS
documentCategoryInventorySchema.pre("save", async function (next) {
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


export default mongoose.model(
  "DocumentCategoryInventory",
  documentCategoryInventorySchema
);
