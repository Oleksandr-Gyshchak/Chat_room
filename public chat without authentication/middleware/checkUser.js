
var mongoose = require('mongoose');
var UserModel = require('../models/user.model');

const setUser = async function (req, res, next) {

    if (!req.body && !req.body.email && !req.body.username) {
        res.status(400).send('Invalid request')
    }

    try {
        let conditionQuery = {
            email: req.body.email
        };

        let userProfile = await UserModel.findOne(
            conditionQuery
        ).lean();


        if (!userProfile) {
            let userItem = {
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                createdDate: Date.now(),
            };

            userProfile = await UserModel.create(userItem);
        }

        req.user = userProfile;
        next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    setUser
};