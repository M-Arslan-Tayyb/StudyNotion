require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//auth
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      console.log("JWT Secret:", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        console.log("Token could not be decoded");
        return res
          .status(401)
          .json({ msg: "Token is not valid and not getting decoded" });
      }

      console.log("Decoded Token:", JSON.stringify(decoded));
      req.user = decoded;
    } catch (e) {
      console.log("JWT Verification Error:", e.message);
      return res.status(401).json({ msg: "Token is not valid" });
    }

    next();
  } catch (err) {
    console.error("Authentication Middleware Error:", err.message);
    res.status(500).send("authentication failed while verifying token in auth");
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    //user accountType should be student
    if (req.user.accountType !== "Student") {
      return res
        .status(403)
        .json({ msg: "Only Students are allowed to access this route" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("user role is not verified");
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    //user accountType should be student
    if (req.user.accountType !== "Instructor") {
      return res
        .status(403)
        .json({ msg: "Only Instructor are allowed to access this route" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("user role is not verified");
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    //user accountType should be student
    console.log("account type: ", req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res
        .status(403)
        .json({ msg: "Only Admin are allowed to access this route" });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("user role is not verified of Admin");
  }
};
