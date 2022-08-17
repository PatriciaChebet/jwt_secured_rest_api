
exports.authConfig = function (app) {
   app.post('/auth/signup', (req, res) => {
      const { password, email } = req.body;
      console.log(password, email);
      res.send("Auth route working")
   })
};