import express from "express";
import upload from "../config/multer.js"; // your existing multer setup

import {
  createItemBrand,
  getAllItemBrands,
  getItemBrand,
  getItemBrandByCode,
  updateItemBrand,
  deleteItemBrand,
} from "../controllers/itemBrand.controller.js";

const router = express.Router();

// ================= ROUTES =================

// Create Brand (with image)
router.post("/create_item_brand", upload.single("image"), createItemBrand);

// Get All Brands
router.get("/get_item_brand", getAllItemBrands);

// Get Brand by ID
router.get("/get_item_brand_by_id/:id", getItemBrand);

// Get Brand by Code
router.get("/get_item_brand_by_code/:code", getItemBrandByCode);

// Update Brand (image update allowed but code locked)
router.put("/update_item_brand_by_id/:id", upload.single("image"), updateItemBrand);

// Delete Brand
router.delete("/delete_item_brand_by_id/:id", deleteItemBrand);

export default router;
