const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config.js");
const { authmiddleware } = require("../middleware.js");
const { User, Account } = require("../db.js");

const userrouter = express.Router();
const signupschema = zod.object({
  firstname : zod.string(),
  lastname : zod.string(),
  username : zod.string().email(),
  password : zod.string(),
})

const signinschema = zod.object({
  username : zod.string().email(),
  password : zod.string(),
})

const updateschema = zod.object({
  password : zod.string().optional(),
  firstname : zod.string().optional(),
  lastname : zod.string().optional(),
})

userrouter.post("/signup",async (req,res) => {
  const result = signupschema.safeParse(req.body);
  if(!result.success){
    return res.status(411).json({
      msg : "incorrect inputs"
    })
  }
  const existinguser = await User.findOne({
    username : req.body.username
  })

  if(existinguser){
    return res.status(411).json({
      msg : "email already taken"
    })
  }
  const dbuser = await User.create(req.body); //error

  await Account.create({
    userid : dbuser._id,
    balance : parseFloat((Math.random()*10000)+1).toFixed(2),
  })

  const token = jwt.sign({
    userid : dbuser._id
  },JWT_SECRET)

  res.status(200).json({
    msg : "user created successfully",
    token : token
  })
})

userrouter.post("/signin",async (req,res)=>{
    const result = signinschema.safeParse(req.body);
    if(!result.success){
      return res.status(411).json({
        msg : "invalid inputs"
      });
    }
    const user = await User.findOne({
    username : req.body.username
    })
    if (!user){
      return res.status(411).json({
        msg : "user not found. signup first"
      })
    }
    const token = jwt.sign({
      userid : user._id
    },JWT_SECRET);

    res.status(200).json({
      token : token
    })
})

userrouter.put("/",authmiddleware,async (req,res)=>{
  const result = updateschema.safeParse(req.body);
  if(!result.success){
    return res.status(411).json({
      msg : "bad inputs"
    })
  }
  await User.updateOne({
    _id : req.userid 
  },req.body);

  res.status(200).json({
    msg : "details updated successfully!"
  })

})

userrouter.get("/bulk",authmiddleware,async (req,res)=>{
  const filter = req.query.filter || "";
  const users = await User.find({
    "$or" : [{
      firstname : {
        "$regex" : filter
      }
    },{
      lastname : {
        "$regex" : filter
      }
    }]
  })

  if(!users){
    res.status(411).json({
      msg : "user not found"
    })
  }
  res.status(200).json({
    users : users.map((user)=>({
      firstname : user.firstname,
      lastname : user.lastname,
      userid : user._id,
    }))
  })
})

module.exports = userrouter;

