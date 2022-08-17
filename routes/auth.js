const VerifyUserMiddleware = require("./middlewares/verify.user.middleware");

exports.authConfig = function (app) {

   app.post('/auth/signup', [
      VerifyUserMiddleware.hasAuthValidFields,
      VerifyUserMiddleware.checksEmailExists
   ]);

};