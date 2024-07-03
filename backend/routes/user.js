import express from "express";
import  zod  from "zod";
import User from "../db";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config"
import { authmiddleware } from "../middleware"

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
  const body = req.body;
  const result = signupschema.safeParse(body);
  if(!result.success){
    return res.status(411).json({
      msg : "incorrect inputs/email already taken"
    })
  }
  const existinguser = User.findOne({
    username : body.username
  })
  if(existinguser){
    return res.status(411).json({
      msg : "incorrect inputs/email already taken"
    })
  }
  const dbuser = await User.create(body);
  const token = jwt.sign({
    userid : dbuser._id
  },JWT_SECRET)

  res.status(200).json({
    msg : "user created successfully"
    token : token
  })
})

userrouter.post("/signin",async (req,res){
    const body = req.body;
    const result = signinschema.safeParse(body);
    if(!result.success){
      return res.status(411).json({
        msg : "invalid inputs"
      });
    }
    const user = await User.findOne({
    username : body.username
    })
    if (!user){
      return res.status(411).json({
        msg : "user not found. signup first"
      })
    }
    const token = jwt.sign({
      userid : body._id
    },JWT_SECRET)
    res.status(200).json({
      token : token
    })
})

userrouter.put("/",authmiddleware,async (req,res)=>{
  const body = req.body;
  const result = updateschema.safeParse(body);
  if(!result.success){
    return res.status(411).json({
      msg : "bad inputs"
    })
  }
  await User.update({
    _id : req.userid 
  },body);
  
  res.status(200).json({
    msg : "details updated successfully!"
  })

})

module.exports({
  userrouter
})
