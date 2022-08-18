const { check, validationResult } = require('express-validator')
const existingUsers = require('../../db')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const env_variables = require('../../common/config/env.config')


exports.hasAuthValidFields = [check("email", "Please provide a valid email").isEmail(), check("password", "Please provide a password of length greater than 6").isLength({min: 6}), function (req, res, next) {
    const { password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(404).json({
            errors: errors.array()
        })
    }

    return next();
 }
]; 

exports.checksEmailExists = (req, res, next) => {
    const { password, email } = req.body;

     let user = existingUsers.users.find((user) =>{
        return user.email === email
     })
     
    if (user){
        return res.status(400).json({
            "errors" : [
                {
                    "msg": "This user already exists"
                }
            ]
    })
    }
    return next()
}

exports.hashPassword = (req, res, next) => {
    const { password, email } = req.body;
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(password).digest('base64')
    let hashedPassword = salt + "$" + hash

    existingUsers.users.push({
        email: email,
        password: hashedPassword
    })

    return next()
}

exports.sendjwt = (req, res, next) => {
    const { email, password } = req.body
    const jwt_secret = env_variables.jwt_secret

    const token = JWT.sign({email}, jwt_secret)

    res.json({
        token
    })
}

exports.checksEmailPassMatch = (req, res, next) => {
   const { password, email } = req.body

    const user = existingUsers.users.find((user) => {
        return email === user.email
    })

    if (!user) {
        return res.json({
            "errors": [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }

    let passwordFields = user.password.split('$')
    let salt = passwordFields[0]
    let hashPass = crypto.createHmac('sha512', salt).update(password).digest("base64");

    if (hashPass !== passwordFields[1]) {
        return res.json({
            "errors": [
                {
                    msg: "Invalid credentials"
                }
            ]
        })
    }

    const jwt_secret = env_variables.jwt_secret
    const token = JWT.sign({email}, jwt_secret)

    res.json({
        token
    })
}