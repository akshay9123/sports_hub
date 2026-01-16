import mongoose from "mongoose";

const SalesExecutiveSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },

    reporting_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesExecutive",
      default: null,
    },

    underStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
    },

    commisionRate: {
      type: String,
    },
    rateOn: {
      type: String,
    },
    amountType: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);


SalesExecutiveSchema.pre("save", async function (next) {
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

const SalesExecutive = mongoose.model("SalesExecutive", SalesExecutiveSchema)

export default SalesExecutive