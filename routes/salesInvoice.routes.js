import express from "express";
import {
  createSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoiceById,
  updateSalesInvoice,
  cancelSalesInvoice,
} from "../controllers/salesInvoice.controller.js";

const router = express.Router();

// CREATE INVOICE
router.post("/invoice_create", createSalesInvoice);

// GET ALL INVOICES (List View)
router.get("/get_invoice_all", getAllSalesInvoices);

// GET SINGLE INVOICE
router.get("/get_invoice_by_id/:id", getSalesInvoiceById);

// UPDATE INVOICE (Non-stock fields only)
router.put("/update_invoice/:id", updateSalesInvoice);

// CANCEL / DELETE INVOICE (With Stock Reversal)
router.delete("/delete_invoice/:id", cancelSalesInvoice);

export default router;
