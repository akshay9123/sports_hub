import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerByCode,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} from "../controllers/posCustomerMaster.controller.js";

const router = express.Router();

router.post("/create", createCustomer);
router.get("/getall", getAllCustomers);
router.get("/getcustomerbycode/:code", getCustomerByCode);
router.put("/update/:id", updateCustomer);
router.delete("/customer/:code", deleteCustomer);
router.get("/customer/id/:id", getCustomerById);   

export default router;
