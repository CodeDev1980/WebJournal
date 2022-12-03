module.exports = (req, res) => {
    console.log(req.session)
    res.render('index', {
        title: "Home Page"
    })
}