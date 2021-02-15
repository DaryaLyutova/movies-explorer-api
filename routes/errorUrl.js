const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { errorUrl } = require('../utils/consts');

router.get('/*', (req, res, next) => {
  throw next(new NotFoundError(errorUrl));
});

module.exports = router;
