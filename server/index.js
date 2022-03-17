const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const newsfeedRoute = require('./routes/newsfeed');
const cors = require('cors')
const bodyParser = require('body-parser');



dotenv.config();

// Database connection

mongoose.connect(process.env.DB_CONNECT,  () => 
    console.log('connected to db')
    );

//Middleware
app.use(express.json());
app.use(cors({credentials: true, origin: true}))
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/user', authRoute);
app.use('/api/newsfeed', newsfeedRoute);

app.listen(5000, () => console.log('Server up and running!'))