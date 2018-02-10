const models = require('../models');
const jwt = require('jwt-simple');
const config = require('../config');
const requireAuth = require('../services/passport').requireAuth;
const getTokenForUser = require('../services/token');


const createUser = (req, res) => {
  const user = new models.User(req.body);
  user.save((err, user) => {
    if (err) return res.send(err);
    res.send({
      token: getTokenForUser(user),
      user: user,
    });
  });
};

const getUsers = (req, res) => {
  models.User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};

const getUser = (req, res) => {
  res.send(req.user);
};

const searchEmail = () => {
  return models.User.find({ grantemail: { $exists: true } });
}

const grantUser = (req, res) => {
  let checkemail = req.body.email;
  models.User.find({}, (err, users) => {
    if (err) return res.send(err);
    if (users[0].grantemail.includes(checkemail)) return res.sendStatus(409);
  });
  req.user.grantemail.push(checkemail);
  req.user.save((err, user) => {
    if (err) {
      return res.send(err);
      console.log('error saving grantemail', err);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = (app) => {
  app.post('/user', requireAuth, grantUser);
  app.post('/users', createUser);
  app.get('/users', requireAuth, getUsers);
  app.get('/user', requireAuth, getUser);
};
