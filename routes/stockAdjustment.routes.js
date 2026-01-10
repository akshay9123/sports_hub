import express from "express";
import upload from "../config/multer.js"; // <-- your existing multer config import here
import {
  createStockAdjustment,
  getAllStockAdjustments,
  getStockAdjustmentById,
  getStockAdjustmentByVoucher,
  reverseStockAdjustment,
  // getAllStockAdjustments,
  // getStockAdjustmentById,
  // updateStockAdjustment,
  // deleteStockAdjustment,
} from "../controllers/stockAdjustment.controller.js";

const router = express.Router();

// router.post("/create", upload.single("attachment"), createStockAdjustment);
router.post("/stock-adjustment", createStockAdjustment);
router.get("/stock-adjustment", getAllStockAdjustments);
router.get("/stock-adjustment/:id", getStockAdjustmentById);
router.get("/stock-adjustment/voucher/:voucherNo", getStockAdjustmentByVoucher);
router.delete("/stock-adjustment/:id", reverseStockAdjustment);
// router.get("/getall", getAllStockAdjustments);
// router.get("/getbyid/:id", getStockAdjustmentById);
// router.put("/updatebyid/:id", updateStockAdjustment);
// router.delete("/deletebyid/:id", deleteStockAdjustment);

export default router;
