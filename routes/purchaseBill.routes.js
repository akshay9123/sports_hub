import express from "express";
import { createPurchaseBill } from "../controllers/purchaseBill.controller.js";

const router = express.Router();

router.post("/create", createPurchaseBill);

export default router;
