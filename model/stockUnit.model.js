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


StockUnitSchema.pre("save", async function (next) {
  if (this.code) return next();

  try {
    // Find last item whose code is ONLY digits
    const lastItem = await mongoose
      .model("StockUnit")
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

const StockUnit = mongoose.model("StockUnit", StockUnitSchema)
export default StockUnit