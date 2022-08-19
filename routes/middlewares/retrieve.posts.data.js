const existingData = require('../../db')
const JWT = require("jsonwebtoken")
const env_variables = require('../../common/config/env.config')

exports.getPublicPosts = (req, res, next) => {
    res.json(existingData.publicPosts)
}

exports.checkAuth = (req, res, next) => {
    const token  = req.header('x-auth-token');

    console.log(token);

    if (!token){
        return res.status(404).json({
            "errors": [
                {
                    "msg": "Invalid credentials"
                }
            ]
        })
    }
    const secret = env_variables.jwt_secret
    try {
        let loggedInUser = JWT.verify(token, secret)
        req.user = loggedInUser.email
        return next()
    } catch (error) {
        return res.status(404).json({
            "errors": [
                {
                    "msg": "Invalid token"
                }
            ]
        })
    }
}

exports.getPrivatePosts = (req, res, next) => {
    res.json(existingData.privatePosts)
}