import mongoose from "mongoose";

const PosCustomerMasterSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  gstNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    requried: true,
  },
  phone: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  gender: {
    type: String,
    requried: true,
  },
  dob: {
    type: Date,
    requried: true,
  },
  loyaltyCard: {
    type: String,
  },
  loyaltyCardOpeningPoint: {
    type: String,
  },
  cardNo: {
    type: String,
  },
  status: {
    type: String,
  },
  anniversary: {
    type: String,
  },
  spouseName: {
    type: String,
  },
  gstNoIfB: {
    type: String,
  },
  territory: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitiude: {
    type: String,
  },
}, {timestamps: true});


// Auto-generate code ALWAYS
PosCustomerMasterSchema.pre("save", async function (next) {
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

const PosCustomerMaster = mongoose.model("PosCustomerMaster", PosCustomerMasterSchema)
export default PosCustomerMaster