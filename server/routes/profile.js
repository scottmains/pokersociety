const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Users = require('../model/User');


router.post('/userdelete', (req,res)=>{
    const email = req.body.email;
    const userDelete= Users.find();
    userDelete.findOneAndRemove({"email": email}, function(err, obj) {
    if (err) throw err;
      console.log("1 user deleted");
    
     });
  });

  module.exports = router 