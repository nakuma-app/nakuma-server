const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users.model');
const config = require("../config");

const JWT_SECRET = config.jwt.secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload.userId, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));


module.exports.isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports.isUser = async (req, res, next) => {
  const userId = req.user._id.toString();

  // Vérification pour les requêtes GET
  if (req.method === 'GET' && req.params.userId && req.params.userId !== userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Vérification pour les requêtes POST
  if (req.method === 'POST' && req.body.userId && req.body.userId !== userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

module.exports.isAdmin = async (req, res, next) => {
  if(req.user.role == 'admin') {
    next();
  }
  else {
    const err = new Error('Unauthorized');
    err.status = 403;
    return next(err);
  }
}
