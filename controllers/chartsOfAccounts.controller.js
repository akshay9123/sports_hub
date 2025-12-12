import ChartsOfAccounts from "../model/chartsofAccount.model.js";



// CREATE
export const createChartsAccount = async (req, res) => {
  try {
    // remove code if sent by mistake
    if (req.body.code) {
      delete req.body.code;
    }

    const newDoc = new ChartsOfAccounts(req.body);
    const saved = await newDoc.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Chart of Account created",
        data: saved,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getAllChartsAccounts = async (req, res) => {
  try {
    const data = await ChartsOfAccounts.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getChartsAccountById = async (req, res) => {
  try {
    const data = await ChartsOfAccounts.findById(req.params.id);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Chart of Account not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY CODE
export const getChartsAccountByCode = async (req, res) => {
  try {
    const data = await ChartsOfAccounts.findOne({ code: req.params.code });

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Chart of Account not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BY ID  (IMPORTANT: CODE SHOULD NEVER UPDATE)
export const updateChartsAccountById = async (req, res) => {
  try {
    // Prevent code update
    if (req.body.code) {
      delete req.body.code;
    }

    const updated = await ChartsOfAccounts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Chart of Account not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Chart of Account updated",
        data: updated,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE BY ID
export const deleteChartsAccountById = async (req, res) => {
  try {
    const deleted = await ChartsOfAccounts.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Chart of Account not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Chart of Account deleted successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
