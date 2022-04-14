const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Newsfeed = require('../model/Newsfeed');


router.post('/postnewsfeed', async (req,res) => {

  const now = new Date();
  console.log(now.toLocaleString('en-GB', { timeZone: 'Europe/London' })); 

  const newPost = new Newsfeed({
    
         userId:  req.body.userId,
         title: req.body.title,
         body: req.body.body,
         date: now.toLocaleString('en-GB', { timeZone: 'Europe/London' })
      }
  );
  console.log(req.body)
  newPost.save((error, post) => {
      if (error) {
          console.log(error);
          // Throw error or return error result
      }

});
});



   
router.get('/getnewsfeed', async (req,res) => {
  const posts = await Newsfeed.find().sort({_id:-1})
  res.json(posts);
});


module.exports = router