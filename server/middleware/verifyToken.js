const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function auth (req,res,next){
  
      const authHeader = req.headers["authorization"];
      const accessToken = authHeader && authHeader.split(" ")[1];
    
      if (accessToken == null) return res.sendStatus(401);
    
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.tokenData = decoded;
        next();
      });
    }
