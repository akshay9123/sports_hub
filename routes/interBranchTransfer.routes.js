import express from "express";
import {
  createIBT,
  getAllIBT,
  getIBTById,
} from "../controllers/interBranchTransfer.controller.js";

const router = express.Router();

router.post("/inter-branch-transfer", createIBT);
router.get("/inter-branch-transfer", getAllIBT);
router.get("/inter-branch-transfer/:id", getIBTById);

export default router;
