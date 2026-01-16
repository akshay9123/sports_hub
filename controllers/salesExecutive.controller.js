import SalesExecutive from "../model/salesExecutive.model.js";

// CREATE
export const createSalesExecutive = async (req, res) => {
  try {
    const body = { ...req.body };

    // Prevent manual code assignment
    if (body.code) delete body.code;

    const data = await SalesExecutive.create(body);

    return res.status(201).json({
      success: true,
      message: "Sales Executive created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllSalesExecutives = async (req, res) => {
  try {
    const data = await SalesExecutive.find()
      .populate("reporting_to", "name code")
      .populate("underStore", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getSalesExecutiveById = async (req, res) => {
  try {
    const data = await SalesExecutive.findById(req.params.id)
      .populate("reporting_to", "name code")
      .populate("underStore", "name");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sales Executive not found",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY CODE
export const getSalesExecutiveByCode = async (req, res) => {
  try {
    const data = await SalesExecutive.findOne({ code: req.params.code })
      .populate("reporting_to", "name code")
      .populate("underStore", "name");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sales Executive not found",
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BY ID (code is locked)
export const updateSalesExecutiveById = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Prevent code modification
    if (updates.code) delete updates.code;

    const data = await SalesExecutive.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sales Executive not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales Executive updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BY ID
export const deleteSalesExecutiveById = async (req, res) => {
  try {
    const deleted = await SalesExecutive.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Sales Executive not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales Executive deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
