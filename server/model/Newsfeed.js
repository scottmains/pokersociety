const mongoose = require('mongoose');

const newsfeedSchema =  new mongoose.Schema({

    userId:Number,
    id: Number,
    title: String,
    body: String,
    date: String
    
  });
       

module.exports = mongoose.model('Newsfeed', newsfeedSchema);

