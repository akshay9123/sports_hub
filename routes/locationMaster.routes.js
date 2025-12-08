import express from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  getLocationByCode,
} from "../controllers/locationMaster.controller.js";

const router = express.Router();
import upload from "../config/multer.js";

router.post("/create", upload.single("profilePic"), createLocation);
router.get("/getall", getAllLocations);
router.get("/getbyid/:id", upload.single("profilePic"), getLocationById);
router.put("/update/:id", updateLocation);
router.delete("/delete/:id", deleteLocation);
router.get("/getbycode/:code", getLocationByCode);


export default router;
