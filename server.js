// server.js
import express from "express";
// import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import csvRoutes from "./routes/csvRoutes.js";
import connectDB from "./config.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/csv", csvRoutes);

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(5000, () => console.log("Server running 5000"));
//   })
//   .catch((err) => console.error(err));
