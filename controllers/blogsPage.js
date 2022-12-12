const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const articles = await BlogPost.find({}).sort({_id: -1}).populate('userid');
    res.render('blogs', {
        articles
    })
}
