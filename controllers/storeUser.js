const Member = require('../models/Users');
const path = require('path');
const flash = require('connect-flash');

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/uploads', image.name), async (error) => {
        await Member.create({
            ...req.body,
            image: '/uploads/' + image.name
        })
        if(error){
            const validationErrors = Object.keys(error.errors).map( key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/login')
        }
        res.redirect('/')
    })
}