import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'
import connnectDb from "./db/db.js";
import userRoute from "./routes/userRoutes.js";
import goalroute from "./routes/goalRoutes.js";

dotenv.config({});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/goal", goalroute);

app.listen(PORT, () => {
  connnectDb();
  console.log(`server listining at PORT ${PORT}`);
});
