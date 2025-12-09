import express from "express";
import {
  createInterBranchTransfer,
  getAllTransfers,
  getByCode,
  updateTransfer,
  deleteTransfer,
  getById,
} from "../controllers/interBranchTransfer.controller.js";

const router = express.Router();

router.post("/create", createInterBranchTransfer);
router.get("/getall", getAllTransfers);
router.get("/getbycode/:code", getByCode);
router.put("/update/:id", updateTransfer);
router.delete("/delete/:id", deleteTransfer);
router.get("/getbyid/:id", getById);

export default router;
