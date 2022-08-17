const { check, validationResult } = require('express-validator')
const existingUsers = require('../../db')


exports.hasAuthValidFields = [check("email", "Please provide a valid email").isEmail(), check("password", "Please provide a password of length greater than 6").isLength({min: 6}), function (req, res, next) {
    const { password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(404).json({
            errors: errors.array()
        })
    }

    return next();
    //res.send("Validation passed!")
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
    res.send("Validation passed!")
}