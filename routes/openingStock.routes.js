import express from "express";
import { createOpeningStock, getOpeningStock } from "../controllers/openingStock.controller.js";

const router = express.Router();

router.post("/opening-stock", createOpeningStock);
router.get("/opening-stock", getOpeningStock);

export default router;
