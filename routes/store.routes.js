import express from "express"
import { createStore } from "../controllers/store.controller.js";

const router = express.Router()


// ROUTES TO CREATE THE STORE
router.post("/create_store", createStore);

// ROUTES TO GET THE ALL PRICE CATEGORY
router.get("/all_price_category", getAllPriceCategories);

// ROUTES TO UPDATE THE PRICE CATEGORY BY ID
router.put("/update_price_category/:id", updatePriceCategory);

// ROUTES TO DELETE THE PRICE CATEGORY BY THE HELP OF ID
router.delete("/delete_price_category/:id", deletePriceCategory);

// ROUTES TO GET THE PRICE CATEGORY DETAILS WITH THE HELP OF ID
router.get("/get_specific_price_category/:id", getSpecificPriceCategory)

// ROUTES TO GET THE PRICE CATEGORY DETAILS WITH THE HELP OF UNIQUE CODE
router.get("/get_specific_price_category_code/:code", getPriceCategoryByCode);