import express from "express";
import {
  createCounter,
  getAllCounters,
  getCounterById,
  getCounterByCode,
  updateCounterById,
  deleteCounterById,
} from "../controllers/counter.controller.js";

const router = express.Router();

router.post("/create", createCounter);
router.get("/getall", getAllCounters);
router.get("/getbyid/:id", getCounterById);
router.get("/getbycode/:code", getCounterByCode);
router.put("/updatebyid/:id", updateCounterById);
router.delete("/deletebyid/:id", deleteCounterById);

export default router;
