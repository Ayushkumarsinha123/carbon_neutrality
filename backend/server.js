import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
// import app from './app.js';
import connectDB from "./config/db.js";

import express from "express";
const app = express();

dotenv.config({ path: path.join(__dirname, ".env") }); // load env vars

// connect to Database
connectDB();

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
