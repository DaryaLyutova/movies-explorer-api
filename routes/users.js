const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validation');
const {
  getUsers, updateUser, getMe,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
