module.exports = (req, res, next) => {
    if(req. files == null | req.body.null || req.body.title == null){
        return res.redirect('create')
    }
    next()
}