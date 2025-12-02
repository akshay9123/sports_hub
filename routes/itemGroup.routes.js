import express from "express";
import {
  createItemGroup,
  getAllItemGroups,
  getItemGroup,
  updateItemGroup,
  deleteItemGroup,
  getItemGroupByCode,
} from "../controllers/itemGroup.controller.js";

const router = express.Router();

router.post("/create", createItemGroup);
router.get("/get", getAllItemGroups);
router.get("/get_by_id/:id", getItemGroup);
router.get("/get_by_code/:code", getItemGroupByCode); // ⭐ GET using code
router.put("/update_item/:id", updateItemGroup);
router.delete("/delete_by/:id", deleteItemGroup);

export default router;
