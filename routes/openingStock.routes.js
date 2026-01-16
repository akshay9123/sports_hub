import express from "express";
import {
  createOpeningStock,
  getOpeningStock,
  getItemsByStoreId,
  getOpeningStockByStore,
  getItemsByStoreFromBatch,
  rebuildBatchStock,
} from "../controllers/openingStock.controller.js";

const router = express.Router();

router.post("/opening-stock", createOpeningStock);
router.get("/opening-stock", getOpeningStock);
router.get("/store/:storeId/items", getItemsByStoreId);
router.get("/opening-stock/store/:storeId", getOpeningStockByStore);
router.get("/opening-stock/batch/:storeId", getItemsByStoreFromBatch)
router.post("/rebuild-batch-stock", rebuildBatchStock);
;



export default router;
