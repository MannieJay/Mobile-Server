const requireSignIn = require('../services/passport').requireSignIn;
const getTokenForUser = require('../services/token');

const signIn = (req, res) => {
  res.send({
    token: getTokenForUser(req.user),
    user: req.user,
  });
};

module.exports = (app) => {
  app.post('/signin', requireSignIn, signIn);
};
