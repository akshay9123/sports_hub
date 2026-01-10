import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemByCode,
  getSuggestedItems
} from "../controllers/itemMaster.controller.js";
import {
  getItemsWithStock,
  getLowStockItems,
  getItemStockSummary,
} from "../controllers/itemStock.controller.js";

import upload from "../config/multer.js";

const router = express.Router();

router.post("/create_item", upload.single("attachment"), createItem);
router.get("/get_all_item", getAllItems);
router.get("/get_item/:id", getItemById);
router.put("/update_item/:id", upload.single("attachment"), updateItem);
router.delete("/delete_item/:id", deleteItem);
router.get("/get_by_code/:code", getItemByCode);
router.get("/items-with-stock", getItemsWithStock);
router.get("/low-stock", getLowStockItems);
router.get("/item-stock-summary/:itemId", getItemStockSummary);
router.get("/suggested/:itemId", getSuggestedItems);



export default router;
