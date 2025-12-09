import mongoose from "mongoose";

const locatinMasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  party: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String
  },

  // COMPLIANCE           
  gstNo: {
    type: String,
  },
  ewayUsername: {
    type: String,
  },
  ewayPassword: {
    type: String,
  },
  gstInUsername: {
    type: String,
  },
  gstInPassword: {
    type: String,
  },
  othelicense1: {
    type: String,
  },
  othelicense2: {
    type: String,
  },
  bankDetails: {
    type: String,
  },


  //   ADDRESS
  address: {
    type: String
  },
  country: {
    type: String
  },
  state:{
    type: String
  },
  city: {
    type: String
  },
  pinCode: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  }
});



// Auto-generate code ALWAYS
locatinMasterSchema.pre("save", async function (next) {
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


const LocationMaster = mongoose.model("LocationMaster", locatinMasterSchema);

export default LocationMaster