import SalesInvoice from "../model/salesInvoice.model.js";

// --------------------------------------------
// CREATE INVOICE
// --------------------------------------------
export const createSalesInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // At least 1 item check
    if (!invoiceData.items || invoiceData.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    const invoice = await SalesInvoice.create(invoiceData);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating invoice",
      error: error.message,
    });
  }
};

// --------------------------------------------
// GET ALL INVOICES
// --------------------------------------------
export const getAllSalesInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find()
      .populate("store")
      .populate("customer")
      .populate("price_category");

    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching invoices",
      error: error.message,
    });
  }
};

// --------------------------------------------
// GET SINGLE INVOICE BY ID
// --------------------------------------------
export const getSalesInvoiceById = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findById(req.params.id)
      .populate("store")
      .populate("customer")
      .populate("price_category");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching invoice",
      error: error.message,
    });
  }
};

// --------------------------------------------
// UPDATE INVOICE BY ID
// --------------------------------------------
export const updateSalesInvoice = async (req, res) => {
  try {
    const updatedInvoice = await SalesInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating invoice",
      error: error.message,
    });
  }
};

// --------------------------------------------
// DELETE INVOICE BY ID
// --------------------------------------------
export const deleteSalesInvoice = async (req, res) => {
  try {
    const deletedInvoice = await SalesInvoice.findByIdAndDelete(req.params.id);

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting invoice",
      error: error.message,
    });
  }
};
