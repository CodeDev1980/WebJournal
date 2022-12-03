const User = require('../models/Users');

module.exports = async (req, res) => {
    const users = await User.find({})
    res.render('profiles', {
        users
    })
}