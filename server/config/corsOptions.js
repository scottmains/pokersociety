const allowedOrigins = require('./allowedOrigins.js');


    const corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "allowedHeaders": ["Content-Type"]
      }


module.exports = corsOptions;