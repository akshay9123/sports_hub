import express from "express";
import upload from "../config/multer.js";
import {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ROUTES TO ADD THE NEW CUSTOMER
router.post(
  "/add-customer",
  upload.fields([
    { name: "profile_photo", maxCount: 1 },
    { name: "attachment", maxCount: 1 },
  ]),
  addCustomer
);

// ROUTES TO GET ALL THE CUSTOMER
router.get("/get_all_customer", getAllCustomers);

// ROUTES TO GET CUSTOMER BY ID
router.get("/getCustomer/:id", getCustomerById);

// ROUTES TO UPDATE THE CUSTOMER
router.put(
  "/updateCustomer/:id",
  upload.single("profile_photo"),
  updateCustomer
);

export default router;
