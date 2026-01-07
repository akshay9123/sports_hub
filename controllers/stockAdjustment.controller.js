import StockAdjustment from "../model/stockAdjustment.model.js"; // path adjust if needed

/* =========================================================
   CREATE STOCK ADJUSTMENT  (supports file + form-data)
========================================================= */
export const createStockAdjustment = async (req, res) => {
  try {
    let data = req.body;

    // 📌 If items comes as string (form-data case)
    if (typeof data.items === "string") {
      data.items = JSON.parse(data.items);
    }

    // 📌 File Upload handle
    if (req.file) {
      data.attachment = `/uploads/attachments/${req.file.filename}`;
    }

    // 📌 Auto amount = quantity * rate
    if (data.items && data.items.length > 0) {
      data.items = data.items.map((item) => ({
        ...item,
        amount:
          item.amount ||
          (item.quantity && item.rate ? item.quantity * item.rate : 0),
      }));
    }

    const saved = await StockAdjustment.create(data);

    return res.status(201).json({
      success: true,
      message: "Stock Adjustment created successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating stock adjustment",
      error: error.message,
    });
  }
};

/* =========================================================
   GET ALL
========================================================= */
export const getAllStockAdjustments = async (req, res) => {
  try {
    const data = await StockAdjustment.find()
      .populate("store") // 🔗 LocationMaster
      .populate("party") // 🔗 Customer (FULL data)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Stock Adjustment List",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching list",
      error: error.message,
    });
  }
};



/* =========================================================
   GET SINGLE BY ID
========================================================= */
export const getStockAdjustmentById = async (req, res) => {
  try {
    const data = await StockAdjustment.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE STOCK ADJUSTMENT (Supports new file + items JSON)
========================================================= */
export const updateStockAdjustment = async (req, res) => {
  try {
    let data = req.body;

    // 📌 If items JSON string me aaye
    if (typeof data.items === "string") {
      data.items = JSON.parse(data.items);
    }

    // 📌 File replace hua to update file path
    if (req.file) {
      data.attachment = `/uploads/attachments/${req.file.filename}`;
    }

    // 📌 Amount recalc
    if (data.items && data.items.length > 0) {
      data.items = data.items.map((item) => ({
        ...item,
        amount:
          item.amount ||
          (item.quantity && item.rate ? item.quantity * item.rate : 0),
      }));
    }

    const updated = await StockAdjustment.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stock Adjustment updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE
========================================================= */
export const deleteStockAdjustment = async (req, res) => {
  try {
    const deleted = await StockAdjustment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stock Adjustment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting",
      error: error.message,
    });
  }
};
