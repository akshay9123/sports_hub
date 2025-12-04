import express from "express";
import upload from "../config/multer.js"; // <-- your existing multer config import here

import {
  createItemCategory,
  getAllItemCategories,
  getItemCategory,
  getItemCategoryByCode,
  updateItemCategory,
  deleteItemCategory,
} from "../controllers/itemCategory.controller.js";

const router = express.Router();

// ================= ROUTES ======================

// Create Category (image supported)
router.post("/create_item_category", upload.single("image"), createItemCategory);

// Get All Categories
router.get("/get_all_item_category", getAllItemCategories);

// Get By ID
router.get("/get_item_category_by_id/:id", getItemCategory);

// Get By Code
router.get("/get_item_category_by_code/:code", getItemCategoryByCode);

// Update Category (image allowed, code not updated)
router.put("/update_item_category/:id", upload.single("image"), updateItemCategory);

// Delete Category
router.delete("/delete_item_category/:id", deleteItemCategory);

export default router;
