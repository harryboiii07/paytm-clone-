import express from "express";
import userrouter from "./user"
const mainrouter = express.Router();

mainrouter.use("/user",userrouter);

module.exports({
  mainrouter
})

