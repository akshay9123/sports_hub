import mongoose from "mongoose";

const coaGroupsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // optional: naam unique ho
      trim: true,
    },
    // Unique Code
    code: {
      type: String,
      unique: true,
    },

    inactive: {
      type: Boolean,
      default: false, // default Active rakha hai
    },

    nature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);



coaGroupsSchema.pre("save", async function (next) {
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



const CoaGroups = mongoose.model("CoaGroups", coaGroupsSchema);

export default CoaGroups;
