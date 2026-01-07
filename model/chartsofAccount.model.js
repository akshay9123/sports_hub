import mongoose from "mongoose";


const ChartsOfAccountsSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
    },
    isSubleder: {
      type: Boolean,
      default: false,
    },
    underLedger: {
      type: String,
    },
    underGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CoaGroups",
      required: true,
    },
    type: {
      type: String,
    },
    accountNo: {
      type: String,
    },
    ifscRtgs: {
      type: String,
    },
    classification: {
      type: String,
    },
    isLoanAccount: {
      type: Boolean,
      default: false,
    },
    intrestRate: {
      type: Number,
    },
    calcultaionOn: {
      type: String,
    },
    tdsApplicable: {
      type: Boolean,
      default: false,
    },
    tdsSection: {
      type: String,
    },
    address: {
      type: String,
    },
    pan: {
      type: String,
    },

    // ATTRIBUTES APPLICABLE

    employee: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// Auto-generate code ALWAYS
ChartsOfAccountsSchema.pre("save", async function (next) {
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

const ChartsOfAccounts = mongoose.model("ChartsOfAccounts", ChartsOfAccountsSchema);

export default ChartsOfAccounts