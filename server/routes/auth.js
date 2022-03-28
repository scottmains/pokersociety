const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const verify = require('../middleware/verifyToken.js');

// ALL CODE RELATING TO REGISTER API END POINT
router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID AND EMAIL EXISTS
    const studentIdExist = await User.findOne({studentid: req.body.studentid});
    if(studentIdExist) return res.status(418).send('This Student ID has arleady been registered.')

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(419).send('Email already exists.')

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATES A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        studentid: req.body.studentid,
        password:hashedPassword,
       
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

const generateAccessToken = (user) => {
 return   jwt.sign(  { id: user.studentid, isAdmin: user.isAdmin }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "15m"})
    }

const generateRefreshToken = (user) => {
 return  jwt.sign(  { id: user.studentid, isAdmin: user.isAdmin }, 
    process.env.REFRESH_TOKEN_SECRET)
        }
        
let refreshTokens = [];

router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID EXISTS
    const user = await User.findOne({studentid: req.body.studentid});
    if(!user) return res.status(418).send('This Student ID has not been registered')

    //CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(419).send('Invalid Password');

    if (user){
     const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    res.json({
        studentid: user.studentid,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken
    })
    } else res.sendStatus(401);
});



router.post('/refresh', async (req,res) => {

const refreshToken = req.body.accessToken

if (!refreshToken) return res.status(401).json("You are not authenticated")
if(!refreshTokens.includes(refreshToken)){
    return res.status(403).json("Refresh token isn't valid.")
}
jwt.verify(refreshToken,  process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshToken.filter(token=>token !==refreshToken);

    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    })
})
});

router.post('/logout', verify, async (req,res) => {

    const refreshToken = req.body.accessToken;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

module.exports = router;