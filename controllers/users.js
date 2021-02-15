const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const NoRightError = require('../errors/NoRightError');
const IdError = require('../errors/IdError');
const LoginError = require('../errors/IdError');
const SameUserError = require('../errors/SameUserError');
const {
  errorReq, errorId, errorSameUser, errorLogin, errorNoUser, errorUpDate,
} = require('../utils/consts');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IdError(errorReq));
      }
      if (err.name === 'MongoError') {
        next(new SameUserError(errorSameUser));
      }
      return next(err);
    });
};

const login = (req, res, next) => User.findUserByCredentials(req.body.email, req.body.password)
  .then((user) => {
    // аутентификация успешна! пользователь в переменной user
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    // вернём токен
    res.send({ token });
  })
  .catch((err) => {
    if (err.name === 'Error') {
      next(new LoginError(errorLogin));
    }
    return next(err);
  });

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findById(req.user._id)
    .orFail(new NotFoundError(errorNoUser))
    .then((foundUser) => {
      if (foundUser._id.toString() === req.user._id) {
        return User.findByIdAndUpdate(
          req.user._id,
          { name, email },
          {
            new: true,
            runValidators: true,
          },
        )
          .then((user) => { res.send({ user }); });
      }
      // eslint-disable-next-line consistent-return
      throw next(new NoRightError(errorUpDate));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IdError(errorId));
      }
      return next(err);
    });
};

module.exports = {
  getUsers, createUser, login, getMe, updateUser,
};
