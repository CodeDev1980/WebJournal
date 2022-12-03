const UserProfile = require('../models/Users');

module.exports = async (req, res) => {
    const users = await UserProfile.find({})
    res.render('profiles', {
        users
    })
}