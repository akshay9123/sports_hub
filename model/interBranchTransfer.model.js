import mongoose from "mongoose";

// Item Schema
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

// Logistics Schema
const LogisticsSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  shippingMode: { type: String, required: true },
  shippingCompany: { type: String, required: true },
  shippingCompanyAbout: { type: String, required: true },
  shippingTrackingNo: { type: String, required: true },
  shippingDate: { type: Date, required: true },
  shippingCharges: { type: String, required: true },
  vehicleNo: { type: String },
  chargesType: { type: String, required: true },
  documentThrough: { type: String },
  noOfPackets: { type: String, required: true },
  weight: { type: String },
  distance: { type: String },
  eWayInvoiceNo: { type: String },
  eWayInvoiceDate: { type: Date },
  eWayCancelDate: { type: Date },
  irnNo: { type: String },
  qrCode: { type: String },
  irnCancelDate: { type: Date },
  irnCancelReason: { type: String },
  acknowledgementNo: { type: String },
  acknowledgementDate: { type: Date },
});

// Inter Branch Transfer Schema
const InterBranchTransferSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true },
    category: { type: String, required: true },
    store: { type: String, required: true },
    toStore: { type: String, required: true },
    transferNo: { type: String, unique: true },
    transferDate: { type: Date, required: true },
    postingGl: { type: String, required: true },

    remarks: { type: String },
    attachment: { type: String },

    items: [itemSchema], // multiple items
    logistics: LogisticsSchema, 
  },
  { timestamps: true }
);


// Auto-generate code ALWAYS
InterBranchTransferSchema.pre("save", async function (next) {
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



// Export Models
const InterBranchTransfer = mongoose.model(
  "InterBranchTransfer",
  InterBranchTransferSchema
);

export default InterBranchTransfer;
