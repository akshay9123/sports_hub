// routes/salesAccount.route.js
import express from "express";
import {
  createSalesAccount,
  getAllSalesAccounts,
  getSalesAccountById,
  updateSalesAccount,
  deleteSalesAccount,
} from "../controllers/salesGl.controller.js";

const router = express.Router();

router.post("/create_salesgl", createSalesAccount);
router.get("/get_sales_gl_all", getAllSalesAccounts);
router.get("/get_sales_gl_by_id/:id", getSalesAccountById);
router.put("/update_sales_gl_by_id/:id", updateSalesAccount);
router.delete("/delete_sales_gl_by_id/:id", deleteSalesAccount);

export default router;
