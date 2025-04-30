import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js"
import emissionRouter from "./routes/emissionRoutes.js"

// import your routes

// load enviroment variable
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health check routes
app.get("/", (req, res) => {
  res.status(200).json({
    messgae: "welcome to the Carbon neutrality api",
  });
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/emission",emissionRouter )

// 404 Route handler
app.use((req, res) => {
  res.status(200).json({
    message: "welcome to the Carbon Neutrality API",
  });
});

export default app;
