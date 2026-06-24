const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ FIXED CORS (supports multiple frontend ports + production ready)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
      "https://vishwas-sdmj.onrender.com" // optional safety
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

/* routes */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* use routes */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;