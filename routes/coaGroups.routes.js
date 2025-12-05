import express from "express";
import {
  createCoaGroup,
  getAllCoaGroups,
  getCoaGroupById,
  updateCoaGroup,
  deleteCoaGroup,
  getCoaGroupByCode,
} from "../controllers/coaGroups.controller.js";

const router = express.Router();

router.post("/create_coagroups", createCoaGroup);
router.get("/getall", getAllCoaGroups);
router.get("/get_by_id/:id", getCoaGroupById);
router.put("/update_by/:id", updateCoaGroup);
router.delete("/delete/:id", deleteCoaGroup);
router.get("/get_by_code/:code", getCoaGroupByCode);

export default router;
