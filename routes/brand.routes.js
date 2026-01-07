import express from "express";
import upload from "../config/multer.js";
import {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

const router = express.Router();

router.post("/add_brand", upload.single("image"), addBrand);
router.get("/getallbrand", getAllBrands);
router.get("/get_brand_by_id/:id", getBrandById);
router.put("/update_brand/:id", upload.single("image"), updateBrand);
router.delete("/delete_brand:id", deleteBrand);

export default router;
