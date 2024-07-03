import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

function authmiddleware(req,res,next){
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")){
    return res.status(403).json({
      msg : "authorization failed"
    })
  }
  const token = header.split(" ")[1];
  try{  
    const decoded = jwt.verify(token,JWT_SECRET);
    req.userid = decoded.userid;
    next();
  }
  catch(err){
    return res.status(403).json({
      error : err
    });
  }
}

module.exports({
  authmiddleware
})