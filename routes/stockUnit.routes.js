import express from "express";
import {
  createStockUnit,
  getAllStockUnits,
  getStockUnit,
  updateStockUnit,
  deleteStockUnit,
  getStockUnitByCode,
} from "../controllers/stockUnit.controller.js";

const router = express.Router();

router.post("/create_stock_unit", createStockUnit);
router.get("/get_stock_unit", getAllStockUnits);
router.get("/get_stock_unit_by_id/:id", getStockUnit);
router.put("/update_stock_unit/:id", updateStockUnit);
router.delete("/delete_stock_unit/:id", deleteStockUnit);
router.get("/delete_stock_unit_by_code/:code", getStockUnitByCode);

export default router;
