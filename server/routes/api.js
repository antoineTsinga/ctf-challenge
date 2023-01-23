const express = require("express");
const jwt = require("jsonwebtoken");
const authorize = require("../middlewares/authorization.js");
const userModel = require("../model/user.model.js");
const authentication = require("../middlewares/authentication.js");

require("dotenv").config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET;

router.use(authentication);

router.get("/customer/", authorize("user"), async (req, res) => {
  try {
    const customerId = req.query.id;
    const user = await userModel.findOne({ _id: customerId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("ici");
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", authorize("admin"), async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/users", authorize("admin"), async (req, res) => {
  try {
    const user = new userModel(req.body);

    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/token", async (req, res) => {
  try {
    const user = new userModel(req.body);
    const payload = {
      id: user.id,
      role: user.role,
    };

    const options = {
      expiresIn: "1d",
    };

    res.json(jwt.sign(payload, secretKey, options));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
