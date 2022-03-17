const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
var FormData = require('form-data');
var fs = require('fs');

// ALL CODE RELATING TO REGISTER API END POINT
router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID AND EMAIL EXISTS
    const studentIdExist = await User.findOne({studentid: req.body.studentid});
    if(studentIdExist) return res.status(400).send('This Student ID has arleady been registered.')

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists.')

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATES A NEW USER

 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        studentid: req.body.studentid,
        password:hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF STUDENT ID EXISTS
    const user = await User.findOne({studentid: req.body.studentid});
    if(!user) return res.status(418).send('This Student ID has not been registered')

    //CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(419).send('Invalid Password');

    //ASSIGN A JSON WEB TOKEN IF USER AUTHENTICATED
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


});


module.exports = router;