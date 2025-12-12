import express from "express";
import {
  createChartsAccount,
  getAllChartsAccounts,
  getChartsAccountById,
  getChartsAccountByCode,
  updateChartsAccountById,
  deleteChartsAccountById,
} from "../controllers/chartsOfAccounts.controller.js";

const router = express.Router();

// CREATE
router.post("/create", createChartsAccount);

// GET ALL
router.get("/all", getAllChartsAccounts);

// GET BY ID
router.get("/getbyid/:id", getChartsAccountById);

// GET BY CODE
router.get("/getbycode/:code", getChartsAccountByCode);

// UPDATE BY ID (code cannot update)
router.put("/updatebyid/:id", updateChartsAccountById);

// DELETE BY ID
router.delete("/deletebyid/:id", deleteChartsAccountById);

export default router;
