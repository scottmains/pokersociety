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

    var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
  };


//Middleware
app.use(allowCrossDomain);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cors({credentials: true, origin: true}))

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