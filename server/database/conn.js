// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";

const MongoMemoryServer = require("mongodb-memory-server");

const mongoose = require("mongoose");

module.exports = async function connect() {
  const mongoServer = await MongoMemoryServer.MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri, { dbName: "testingDb" });

  console.log(`MongoDB succesfully connected to ${mongoUri}`);
};
