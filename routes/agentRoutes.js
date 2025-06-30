import express from "express";
import {
  addAgent,
  getAgents,
  getAgentsWithTasks,
} from "../controllers/agentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addAgent);
router.get("/", verifyToken, getAgents);
router.get("/agents-tasks", verifyToken, getAgentsWithTasks);

export default router;
