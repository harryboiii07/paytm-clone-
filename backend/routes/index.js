import express from "express";
import userrouter from "./user"
const mainrouter = express.Router();

mainrouter.use("/user",userrouter);
mainrouter.use("/account",accountrouter);

module.exports({
  mainrouter
})

