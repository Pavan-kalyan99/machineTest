// server.js
import express from "express";
// import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import csvRoutes from "./routes/csvRoutes.js";
import connectDB from "./config.js";
import fs from 'fs';

// added
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
// added
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'https://machinetest-y6dp.onrender.com'],

  // origin: "https://machinetest-y6dp.onrender.com/",
    credentials: true,

}));
app.use(express.json());

// 
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/csv", csvRoutes);

// added
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '/testapp/dist');

  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(500).send('Build not found.');
    }
  });
}
// 
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
