import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  counterNo: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  taxStyle: {
    type: String,
    required: true,
  },
  exchangeReturn: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  maxDiscountPercent: {
    type: String,
  },
  invoiceFormate: {
    type: String,
  },
  employee: {
    type: String,
  },
  group: {
    type: String,
  },
  defaultPosCustomer: {
    type: String,
  },
  allowTenderType: {
    type: String,
  },
  defaultTender: {
    type: String,
  },
  hideAttributePanel: {
    type: Boolean,
  },
  manageDayStartClose: {
    type: Boolean,
  },
  hideTax:{
    type: Boolean
  }
},{timestamps: true});


CounterSchema.pre("save", async function (next) {
  // ALWAYS auto-generate -- user can never give code
  const lastDoc = await this.constructor.findOne().sort({ code: -1 });

  let nextCode = "0000001";

  if (lastDoc && lastDoc.code) {
    const lastNum = parseInt(lastDoc.code);
    nextCode = String(lastNum + 1).padStart(7, "0");
  }

  this.code = nextCode;

  next();
});


const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;
