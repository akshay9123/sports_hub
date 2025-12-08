import express from "express";
import {
  createDocumentCategory,
  getAllDocumentCategories,
  getDocumentCategoryById,
  updateDocumentCategory,
  deleteDocumentCategory,
} from "../controllers/documentCategoryInventory.controller.js";

const router = express.Router();

router.post("/create", createDocumentCategory);
router.get("/getall", getAllDocumentCategories);
router.get("/getbyid/:id", getDocumentCategoryById);
router.put("/updatebyid/:id", updateDocumentCategory);
router.delete("/deletebyid/:id", deleteDocumentCategory);

export default router;
