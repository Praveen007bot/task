import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connnectDb from "./db/db.js";
import userRoute from "./routes/userRoutes.js";
import goalroute from "./routes/goalRoutes.js";
import adminRoute from "./routes/adminRoutes.js";

dotenv.config({});

const allowedOrigins = [
  'http://192.168.128.174:8081',  // Expo development server URL
  'http://192.168.128.25:8081',   // Your physical device IP
  "http://localhost:3000"         // React frontend on localhost
];

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Enable credentials to allow cookies/credentials
}));

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
