import express from "express";
const router = express.Router();
import {
  changePassword,
  createUser,
  loginUser,
} from "../controllers/userController.js";

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.patch("/changePassword", changePassword);

export default router;
