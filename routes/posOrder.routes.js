import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderByCode,
  updateOrderById,
  deleteOrderById,
} from "../controllers/posOrder.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/getall", getAllOrders);
router.get("/getbycode/:code", getOrderByCode);
router.put("/updatebyid/:id", updateOrderById);
router.delete("/deletebyid/:id", deleteOrderById);

export default router;
