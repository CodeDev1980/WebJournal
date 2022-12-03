const Blogs = require('../models/BlogPost');

module.exports = async (req, res) => {
    const articles = await Blogs.find({}).limit(5).populate('userid');
    console.log(req.session)
    res.render('index', {
        articles,
        title: "Home Page"
    })
}