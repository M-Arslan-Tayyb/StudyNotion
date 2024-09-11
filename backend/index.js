require("dotenv").config();
const http = require("http");
const connectDB = require("../backend/src/config/database");
const app = require("./app"); // Importing app.js
const cloudinary = require("../backend/src/config/cloudinary"); 

const port = process.env.PORT || 4001;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    cloudinary.cloudinaryConnect(); // Connect to Cloudinary

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is started at port ${port}`);
    });

    server.on("error", (err) => {
      console.error(`Error starting server: ${err.message}`);
      process.exit(1);
    });
  } catch (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
