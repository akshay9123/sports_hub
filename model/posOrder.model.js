import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
  itemcode: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  packUnit: { type: String },
  packQuantity: { type: Number },
  unit: { type: String },
  quantity: { type: Number },
  ratePer: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  minRate: { type: Number },
  mrp: { type: Number },
  netRate: { type: Number },
  remark: { type: String },
  printDesc: { type: String },
  serviceLocation: { type: String },
  itemBarcode: { type: String },
  bdBatchNo: { type: String },
  bdMfgDate: { type: Date },
  bdExpDate: { type: Date },
  bdSaleRate: { type: Number },
  itemBalance: { type: Number },
  barcode: { type: String },
  lineLevelBarcode: { type: String },
  hsnCode: { type: String },
  brand: { type: String },
});


const PosOrderSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  counter: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderNo: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  salesman: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  customerInfoName: {
    type: String,
  },
  customerInfoPhone: {
    type: String,
  },
  customerInfoLastVisit: {
    type: String,
  },
  customerInfoBillAmount: {
    type: String,
  },
  customerInfoItem: {
    type: String,
  },
  customerInfoEmail: {
    type: String,
  },
  customerInfoAnniversary: {
    type: String,
  },
  customerInfoBalancePoint: {
    type: String,
  },
  refNo: {
    type: String,
  },
  refDate: {
    type: Date,
  },

  //   Billing Address
  billingAddress: {
    type: String,
    required: true,
  },

  //   Shipping Address

  advanceTenderAc: {
    type: String,
  },
  advanceAmount: {
    type: String,
  },

  //   LIST OF ITEMS

  items: [itemSchema],

  remarks: { type: String },
  attachment: { type: String },

  //   right side data

  itemValue: {
    type: String,
  },
  promoDiscount: {
    type: String,
  },
  promoDiscount2: {
    type: String,
  },
  discountCoupan: {
    type: String,
  },
  firstDiscount: {
    type: String,
  },
  anotherDiscount: {
    type: String,
  },
  taxable: {
    type: String,
  },
  taxAmount: {
    type: String,
  },
  discountAmount: {
    type: String,
  },
  discountPercent: {
    type: String,
  },
  roundOff: {
    type: String,
  },
  docAmount: {
    type: String,
  },
},{ timestamps: true });


// Auto-generate code ALWAYS
PosOrderSchema.pre("save", async function (next) {
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


const PosOrder = mongoose.model("PosOrder", PosOrderSchema);

export default PosOrder
