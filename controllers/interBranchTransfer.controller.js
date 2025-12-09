import InterBranchTransfer from "../model/interBranchTransfer.model.js";

// Create Inter Branch Transfer
export const createInterBranchTransfer = async (req, res) => {
  try {
    if (req.body.code) delete req.body.code; // code frontend se kabhi nahi aayega

    const transfer = new InterBranchTransfer(req.body);
    const saved = await transfer.save();

    res.status(201).json({
      success: true,
      message: "Inter Branch Transfer Created Successfully",
      data: saved,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All
export const getAllTransfers = async (req, res) => {
  try {
    const transfers = await InterBranchTransfer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get By Code
export const getByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const transfer = await InterBranchTransfer.findOne({ code });

    if (!transfer)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get By ID
export const getById = async (req, res) => {
  try {
    const transfer = await InterBranchTransfer.findById(req.params.id);

    if (!transfer)
      return res.status(404).json({ success: false, message: "Not Found" });

    res.json({ success: true, data: transfer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update (ID Based) - code change allowed nahi
export const updateTransfer = async (req, res) => {
  try {
    if (req.body.code) delete req.body.code; // code protected

    const updated = await InterBranchTransfer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Updated Successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete
export const deleteTransfer = async (req, res) => {
  try {
    await InterBranchTransfer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
