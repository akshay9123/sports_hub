// models/salesAccount.model.js
import mongoose from "mongoose";

const salesAccountSchema = new mongoose.Schema(
  {
    // Display Name of Account
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique Code
    code: {
      type: String,
      unique: true,
    },

    // Identification (custom id / external reference)
    identification: {
      type: String,
      trim: true,
    },

    // Is Subledger ?
    isSubledger: {
      type: Boolean,
      default: false,
    },

    // Sales GL Under Group (e.g. "Sales - Traded Goods")
    salesGlUnderGroup: {
      type: String,
      trim: true,
      // example: "Sales - Traded Goods"
    },

    // Inactive flag
    inactive: {
      type: Boolean,
      default: false,
    },

    // Type (example: General)
    type: {
      type: String,
      default: "General",
      trim: true,
      // enum: ["General", "Loan", "Others"], // agar chaho to enum laga sakte ho
    },

    // Account number (bank etc.)
    accountNo: {
      type: String,
      trim: true,
    },

    // RTGS/IFSC code
    rtgsIfscCode: {
      type: String,
      trim: true,
    },

    // Classification (e.g. Current Asset, Liability, Income, Expense…)
    classification: {
      type: String,
      trim: true,
    },

    // Is Loan Account ?
    isLoanAccount: {
      type: Boolean,
      default: false,
    },
    intrestRate: {
        type: String,
        trim: true
    },
    calculationOn : {
        type: String,
        default: "Simple"
    },
    tdsSection: {
        type: String,
    },
    // TDS Applicable ?
    tdsApplicable: {
      type: Boolean,
      default: false,
    },

    // Address
    address: {
      type: String,
      trim: true,
    },

    // PAN
    pan: {
      type: String,
      trim: true,
      uppercase: true,
    },

    // Attribute Applicable ?
    attributeApplicable: {
      type: Boolean,
      default: false,
    },

    // Employee (agar employee ka naam store karna hai)
    employee: {
      type: String,
      trim: true,
    },

    // Group (Account group name / id)
    group: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


salesAccountSchema.pre("save", async function (next) {
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

const SalesAccount = mongoose.model("SalesAccount", salesAccountSchema);

export default SalesAccount;
