import SalesAccount from "../model/salesPurchaseGl.model.js";

// ===================================================
// CREATE (Code auto-generate hoga using pre-save hook)
// ===================================================
export const createSalesAccount = async (req, res) => {
  try {
    const data = req.body;

    const newAccount = new SalesAccount(data);
    const saved = await newAccount.save();

    return res.status(201).json({
      success: true,
      message: "Sales Account Created Successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Sales Account",
      error: error.message,
    });
  }
};

// ============================
// Get All Sales Accounts
// ============================
export const getAllSalesAccounts = async (req, res) => {
  try {
    const accounts = await SalesAccount.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: accounts.length,
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch accounts",
      error: error.message,
    });
  }
};

// ============================
// Get Single Account by ID
// ============================
export const getSalesAccountById = async (req, res) => {
  try {
    const account = await SalesAccount.findById(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Sales Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching account",
      error: error.message,
    });
  }
};

// ============================
// UPDATE Sales Account
// ============================
export const updateSalesAccount = async (req, res) => {
  try {
    const updated = await SalesAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Sales Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales Account Updated Successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Sales Account",
      error: error.message,
    });
  }
};

// ============================
// DELETE Sales Account
// ============================
export const deleteSalesAccount = async (req, res) => {
  try {
    const deleted = await SalesAccount.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Sales Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales Account Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete Sales Account",
      error: error.message,
    });
  }
};


// ============================
// Get Sales Account by Code
// ============================
export const getSalesAccountByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const account = await SalesAccount.findOne({ code });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Sales Account with this code not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: account,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching account by code",
      error: error.message,
    });
  }
};
