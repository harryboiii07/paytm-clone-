const express = require("express");
const userrouter = require("./user.js");
const accountrouter = require("./account.js")
const mainrouter = express.Router();

mainrouter.use("/user",userrouter);
mainrouter.use("/account",accountrouter);

module.exports = {
  mainrouter
}

