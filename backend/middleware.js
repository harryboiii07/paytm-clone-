const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

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
    if(decoded.userid){
      req.userid = decoded.userid;
      next();
    }
    else{
      return res.status(403).json({
        msg : "authorization failed"
      })
    }
  }
  catch(err){
    return res.status(403).json({
      error : err
    });
  }
}

module.exports = {
  authmiddleware
}