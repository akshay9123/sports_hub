import express from "express";
import {
  getStockByStore,
  getStockByItem,
  getStockByStoreAndItem,
  getStockByItemCode,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/by-store", getStockByStore);
router.get("/by-item/:itemId", getStockByItem);
router.get("/by-store-item/:storeId/:itemId", getStockByStoreAndItem);
router.get("/by-item-code", getStockByItemCode);

export default router;
