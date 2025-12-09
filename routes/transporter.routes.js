import express from "express";
import {
  createTransporter,
  getTransporters,
  getTransporter,
  updateTransporter,
  deleteTransporter,
  getTransporterByCode,
} from "../controllers/transporter.controller.js";

const router = express.Router();

router.post("/create", createTransporter);
router.get("/getall", getTransporters);
router.get("/getbyid/:id", getTransporter);
router.put("/updatebyid/:id", updateTransporter);
router.delete("/deletebyid/:id", deleteTransporter);
router.get("/getbycode/:code", getTransporterByCode);

export default router;
