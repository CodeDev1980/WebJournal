const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const articles = await BlogPost.find({}).populate('userid');
    res.render('blogs', {
        articles
    })
}