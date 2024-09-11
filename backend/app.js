const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./src/routes/userRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const courseRoutes = require("./src/routes/courseRoutes");
const contactRoutes = require("./src/routes/contactRoute");

const errorHandler = require('./src/middlewares/errorHandler');

// const paymentRoutes = require("../src/routes/paymentRoute");

const { logRequest } = require("./src/middlewares/loggerService");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Middleware for file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Custom Logger Middleware
app.use(logRequest);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/contact", contactRoutes);


// app.use("api/v1/payment", paymentRoutes);

//error middleware:
app.use(errorHandler);

module.exports = app;
