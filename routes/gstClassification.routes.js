import express from "express";
import {
  createGstClassification,
  getAllGstClassification,
  getSingleGstClassification,
  updateGstClassification,
  deleteGstClassification,
  getGstClassificationByCode,
} from "../controllers/gstClassification.controller.js";

const router = express.Router();

router.post("/create_gst_classification", createGstClassification);
router.get("/get_gst_classification", getAllGstClassification);
router.get("/get_gst_classification_by_id/:id", getSingleGstClassification);
router.put("/update_gst_classification_by_id/:id", updateGstClassification);
router.delete("/delete_gst_classification/:id", deleteGstClassification);
router.get("/get_by_code/:code", getGstClassificationByCode);


export default router;
