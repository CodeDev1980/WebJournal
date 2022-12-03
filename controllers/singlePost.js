const SinglePost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const post = await SinglePost.findById(req.params.id).populate('userid');
    res.render('post', {
        post
    })
}