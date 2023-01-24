// import express from "express";
// import bcrypt from "bcrypt";
// import * as dotenv from "dotenv";
// import router from "./routes/api.js";
// import connect from "./database/conn.js";
// import userModel from "./model/user.model.js";

// dotenv.config();

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./model/user.model.js");
const routes = require("./routes/api.js");
const connect = require("./database/conn.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const populatedb = require("./fixtures/populatedb.js");
const users = require("./fixtures/users.js");
require("dotenv").config();

const app = express();

app.use(express.json());

const secretKey = process.env.JWT_SECRET;

const port = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

/** GET: http://localhost:8080*/
app.get("/", (req, res) => {
  try {
    userModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

/** GET: http://localhost:8080/add */
app.post("/add", (req, res) => {
  try {
    const user = new userModel({
      username: "daily tuition",
    });
    user
      .save()
      .then(() => res.json({ message: "Data added succesfully...!" }))
      .catch((error) => res.json(error));
  } catch (error) {
    res.json({ error: "Ivalid Add Request" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const user = new userModel(req.body);
    const userIn = await userModel.findOne({ username: user.username });
    if (!userIn) {
      user.role = "user";
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Successfuly registered" })
        );
    } else {
      res.status(409).json({ message: "User alredy exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const user = new userModel(req.body);

    const userIn = await userModel.findOne({ username: user.username });

    if (userIn) {
      const isMatch = await bcrypt.compare(user.password, userIn.password);
      if (isMatch) {
        const payload = {
          id: userIn.id,
          role: userIn.role,
          "message-ctf": "successfull",
        };

        const options = {
          expiresIn: "1d",
        };
        const token = jwt.sign(payload, secretKey, options);

        res
          .status(200)
          .header({ Authorization: token })
          .json({ "message-ctf": "success login" });
      } else {
        res.status(401).json({ message: "Invalid Credential" });
      }
    } else {
      res.status(401).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
});

connect()
  .then(() => {
    try {
      populatedb(users);
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cant't connect to server");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Invalid Database Connection... !");
  });
