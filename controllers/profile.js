const Profile = require('../models/Users');

module.exports = async (req, res) => {
    const user = await Profile.findById(req.params.id)
    res.render('profile', {
        user
    })
}