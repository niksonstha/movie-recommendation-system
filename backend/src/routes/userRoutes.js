import express from "express";
const router = express.Router();
import { createUser, loginUser } from "../controllers/userController.js";

router.post("/createUser", createUser);
router.get("/loginUser", loginUser);

export default router;
