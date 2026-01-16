import mongoose from "mongoose";

const interBranchItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemMaster",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  remarks: String,
});

const interBranchTransferSchema = new mongoose.Schema(
  {
    transferNo: { type: String, unique: true, required: true },
    transferDate: { type: Date, required: true },

    fromStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },
    toStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationMaster",
      required: true,
    },

    items: [interBranchItemSchema],

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      default: "COMPLETED",
    },

    remarks: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

interBranchTransferSchema.pre("save", async function (next) {
  if (this.transferNo) return next();

  const last = await mongoose
    .model("InterBranchTransfer")
    .findOne({ transferNo: { $regex: /^IBT-/ } })
    .sort({ createdAt: -1 });

  let nextNo = "IBT-0001";

  if (last?.transferNo) {
    const num = parseInt(last.transferNo.split("-")[1]);
    nextNo = `IBT-${String(num + 1).padStart(4, "0")}`;
  }

  this.transferNo = nextNo;
  next();
});

export default mongoose.model("InterBranchTransfer", interBranchTransferSchema);
