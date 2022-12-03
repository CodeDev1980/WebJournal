const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).populate('userid');
    res.render('blogs', {
        blogs
    })
}