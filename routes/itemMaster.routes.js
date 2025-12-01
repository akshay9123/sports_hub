import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemByCode,
} from "../controllers/itemMaster.controller.js";

import upload from "../config/multer.js";

const router = express.Router();

router.post("/create_item", upload.single("attachment"), createItem);
router.get("/get_all_item", getAllItems);
router.get("/get_item/:id", getItemById);
router.put("/update_item/:id", upload.single("attachment"), updateItem);
router.delete("/delete_item/:id", deleteItem);
router.get("/get_by_code/:code", getItemByCode);


export default router;
