// routes/salesAccount.route.js
import express from "express";
import {
  createSalesAccount,
  getAllSalesAccounts,
  getSalesAccountById,
  updateSalesAccount,
  deleteSalesAccount,
  getSalesAccountByCode,
} from "../controllers/salesPurchaseGl.controller.js";

const router = express.Router();

router.post("/create_salespurchasegl", createSalesAccount);
router.get("/get_salespurchasegl_all", getAllSalesAccounts);
router.get("/get_salespurchasegl_id/:id", getSalesAccountById);
router.put("/update_salespurchasegl_by_id/:id", updateSalesAccount);
router.delete("/delete_salespurchasegl_by_id/:id", deleteSalesAccount);
router.get("/get_salespurchasegl_by_code/:code", getSalesAccountByCode);


export default router;
