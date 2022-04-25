const router = require('express').Router();
const verify = require('../middleware/verifyToken');


router.get('/getprofile', async (req,res) => {

    const cookies = req.cookies;
    const user = await User.findOne({ refreshToken }).exec();

    
});

