const router = require('express').Router();
const verify = require('../middleware/verifyToken');

router.get('/newsfeed', verify, (req, res) => {
    res.json({posts: {title: 'my first post', description: 'TOP SECRET'
    }
});
});

module.exports = router