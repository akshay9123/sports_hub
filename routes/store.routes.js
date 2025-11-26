import express from "express"
import { createStore, deleteStore, getAllStore, getStoreByCode, getStoreById, updateStore } from "../controllers/store.controller.js";

const router = express.Router()


// ROUTES TO CREATE THE STORE
router.post("/create_store", createStore);

// ROUTES TO GET THE ALL STORE
router.get("/all_store", getAllStore);

// ROUTES TO UPDATE THE STORE BY ID
router.put("/update_store/:id", updateStore);

// ROUTES TO DELETE THE STORE BY THE HELP OF ID
router.delete("/delete_store/:id", deleteStore);

// ROUTES TO GET THE PRICE CATEGORY DETAILS WITH THE HELP OF ID
router.get("/get_specific_store/:id", getStoreById)

// ROUTES TO GET THE PRICE CATEGORY DETAILS WITH THE HELP OF UNIQUE CODE
router.get("/get_specific_store_code/:code", getStoreByCode);


export default router;