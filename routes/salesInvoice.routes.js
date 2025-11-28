import express from "express";
import {
  createSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoiceById,
  updateSalesInvoice,
  deleteSalesInvoice,
} from "../controllers/salesInvoice.controller.js";

const router = express.Router();

router.post("/invoice_create", createSalesInvoice); // CREATE
router.get("/get_invoice_all", getAllSalesInvoices); // GET ALL
router.get("/get_invoice_by_id/:id", getSalesInvoiceById); // GET ONE
router.put("/update_invoice/:id", updateSalesInvoice); // UPDATE
router.delete("/delete_invoice/:id", deleteSalesInvoice); // DELETE

export default router;
