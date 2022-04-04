const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const newsfeedRoute = require('./routes/newsfeed');
const profileRoute = require('./routes/profile');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

dotenv.config();

// Database connection

mongoose.connect(process.env.DB_CONNECT,  () => 
    console.log('connected to db')
    );

//Middleware
app.use(express.json());
app.use(cors({credentials: true, origin: true}))
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

const proxy = require('http-proxy-middleware')


app.use('/api/user', authRoute);
app.use('/api/newsfeed', newsfeedRoute);
app.use('/api/profile', profileRoute);



app.listen(
    process.env.PORT,
    console.log('Listening on port ', process.env.PORT)
  );