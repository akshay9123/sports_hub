import express from "express";
import {
  createSalesExecutive,
  getAllSalesExecutives,
  getSalesExecutiveById,
  getSalesExecutiveByCode,
  updateSalesExecutiveById,
  deleteSalesExecutiveById,
} from "../controllers/salesExecutive.controller.js";

const router = express.Router();

router.post("/create", createSalesExecutive);
router.get("/getall", getAllSalesExecutives);
router.get("/getbyid/:id", getSalesExecutiveById);
router.get("/getbycode/:code", getSalesExecutiveByCode);
router.put("/updatebyid/:id", updateSalesExecutiveById);
router.delete("/deletebyid/:id", deleteSalesExecutiveById);

export default router;
