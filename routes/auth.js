const VerifyUserMiddleware = require("./middlewares/verify.user.middleware");
const existingUsers = require('../db')

exports.authConfig = function (app) {

   app.post('/auth/signup', [
      VerifyUserMiddleware.hasAuthValidFields,
      VerifyUserMiddleware.checksEmailExists,
      VerifyUserMiddleware.hashPassword,
      VerifyUserMiddleware.sendjwt
   ]);

   app.post('/auth/login', [
      VerifyUserMiddleware.checksEmailPassMatch
   ]);

   app.get('/auth/all', (req, res) => {
      res.json(existingUsers.users)
   });

};