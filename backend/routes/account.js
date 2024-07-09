const express = require("express");
const mongoose = require("mongoose");

const {authmiddleware} = require ("../middleware");
const { User,Account } = require ("../db");


const accountrouter = express.Router();

accountrouter.get("/balance",authmiddleware,async (req,res)=>{
  
  const account = await Account.findOne({
    userid : req.userid
  })
  return res.status(200).json({
    balance : account.balance,
  })
})

accountrouter.post("/transfer",authmiddleware,async (req,res)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
  
  const {to,amount} = req.body;
  const fromuser = await Account.findOne({
    userid : req.userid
  }).session(session);


  if(!fromuser || fromuser.balance < amount){
    await session.abortTransaction();
    return res.status(411).json({
      msg : "insufficient balance / account not found",
    })
  }

  const touser = await Account.findOne({
    userid : to
  }).session(session);

  if(!touser){
    await session.abortTransaction();
    return res.status(411).json({
      msg : "recieving user not found"
    })
  }

  await Account.updateOne({
    userid : req.userid
    },{
    "$inc" : {
      balance : -amount
    }
    }).session(session);

    await Account.updateOne({
      userid : to
      },{
      "$inc" : {
        balance : amount
      }
      }).session(session);

    await session.commitTransaction();
    res.status(200).json({
      msg : "transaction successful"
    });


})

module.exports = accountrouter
