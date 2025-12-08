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

router.post("/create", createLocation);
router.get("/getall", getAllLocations);
router.get("/getbyid/:id", getLocationById);
router.put("/update/:id", updateLocation);
router.delete("/delete/:id", deleteLocation);
router.get("/getbycode/:code", getLocationByCode);


export default router;
