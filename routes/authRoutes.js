import express from "express";
import { login } from "../controllers/authController.js";
import { authRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", authRegister);

export default router;
