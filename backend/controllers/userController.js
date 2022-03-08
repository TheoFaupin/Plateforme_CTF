const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const createUser = async (req, res) => {
    try {
        req.body.role = 1;
        var newUser = await User.create(req.body);
        var token = jwt.sign(
            { _id: newUser._id },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h",
            }
        );
        newUser.token = token;
        newUser.password = null;
        res.status(201).json({success: true, msg: "Successfully created your account.", user: newUser});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, msg: "Error during creation of your account."});
    }
}

const getProfile = async (req, res) => {
    try {
        res.status(200).json({success: true, msg: "Successfully Found your profile", data: req.user});
    } catch (err) {
        res.status(400).json({success: false, msg: "This account do not exists"});
    }
}

const loginUser = async (req, res) => {
    try {
        var tempUser = await User.findOne({username: req.body.username});
        if (!tempUser) {
            res.status(404).json({success: false, msg: "Error during logging to your account."});
            return;
        }
        var isMatch = await tempUser.checkPassword(req.body.password, tempUser.password);

        if (!isMatch) {
            res.status(401).json({success: false, msg: "Error during logging to your account."});
            return;
        }

        var token = jwt.sign(
            { _id: tempUser._id },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h",
            }
        );
        tempUser.token = token;
        tempUser.password = null;
        res.status(201).json({success: true, msg: "Successfully logged to your account.", user: tempUser});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, msg: "Error during logging of your account."});
    }
}

const updateUser = async (req, res, user_id) => {
    try {
        req.body.role = 1;
        await User.findByIdAndUpdate(user_id, req.body);
        res.status(200).json({success: true, msg: "Successfully updated your account."});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during update of your account."});
    }
}

const deleteUser = async (req, res, user_id) => {
    try {
        await User.findByIdAndDelete(user_id);
        res.status(200).json({success: true, msg: "Successfully deleted your account."});
    } catch (err) {
        res.status(400).json({success: false, msg: "Error during deletion of your account."});
    }
}

module.exports = {
    createUser,
    getProfile,
    loginUser,
    updateUser,
    deleteUser
}