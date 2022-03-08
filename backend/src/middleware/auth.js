const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config()

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)
        var isVerified = jwt.verify(token, process.env.TOKEN_KEY);
        if (isVerified) {
            req.user = await User.findById(isVerified._id);
        } else {
            res.status(401).json({success: false, msg: "Error during authentification of the account."});
        }
        next()
    } catch (err) {
        res.status(401).json({success: false, msg: "Error during authentification of the account."});
    }
}

module.exports = authenticateToken;