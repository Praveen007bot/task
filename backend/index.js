import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connnectDb from "./src/db/db.js";
import userRoute from "./src/routes/userRoutes.js";
import goalroute from "./src/routes/goalRoutes.js";
import adminRoute from "./src/routes/adminRoutes.js";

dotenv.config({});

const allowedOrigins = [
  'https://goaltracker-9pc1.onrender.com',
  'http://192.168.128.174:8081',  // Expo development server URL
  'http://192.168.128.25:8081',   // Your physical device IP
  "http://localhost:3000"         // React frontend on localhost
];

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors()); // Handle preflight

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/goal", goalroute);
app.use("/api/v1/admin", adminRoute);

app.listen(PORT, "0.0.0.0", () => {
  connnectDb();
  console.log(`Server listening at PORT ${PORT}`);
});
