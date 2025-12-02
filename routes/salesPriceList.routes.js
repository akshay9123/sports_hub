import express from "express";
import {
  createSalesPriceList,
  getAllSalesPriceList,
  getSingleSalesPriceList,
  updateSalesPriceList,
  deleteSalesPriceList,
} from "../controllers/salesPriceList.controller.js";

const router = express.Router();

// CREATE THE SALES PRICE LIST
router.post("/create_sales_price", createSalesPriceList);

// GET THE SALES PRICE LIST
router.get("/get_sales_price", getAllSalesPriceList);

// GET THE SALES PRICE LIST BY ID 
router.get("/get_sale_price/:id", getSingleSalesPriceList);

// UPDATE THE SALES PRICE LIST
router.put("/update_sale_price/:id", updateSalesPriceList);

// DELETE THE SALES PRICE LIST SPECIFIC BY ID
router.delete("/delete_sale_price/:id", deleteSalesPriceList);

export default router;
