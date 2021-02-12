const router = require('express').Router();
require('dotenv').config();
const movieRouter = require('./movie');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserBody, validateAuth } = require('../middlewares/validation');
const errorRouter = require('./errorUrl');

// авторизация
router.post('/signup', validateUserBody, createUser);

// аутентификация
router.post('/signin', validateAuth, login);

// защита авторизацией
router.use(auth);
router.use('/', movieRouter);
router.use('/', usersRouter);
router.use('/', errorRouter);

module.exports = router;
