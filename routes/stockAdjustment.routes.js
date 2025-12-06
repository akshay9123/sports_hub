import express from "express";
import {
  createStockAdjustment,
  getAllStockAdjustments,
  getStockAdjustmentById,
  updateStockAdjustment,
  deleteStockAdjustment,
} from "../controllers/stockAdjustment.controller.js";

const router = express.Router();

router.post("/create", createStockAdjustment);
router.get("/getall", getAllStockAdjustments);
router.get("/getbyid/:id", getStockAdjustmentById);
router.put("/updatebyid/:id", updateStockAdjustment);
router.delete("/deletebyid/:id", deleteStockAdjustment);

export default router;
