const router = require('express').Router();
const AllErrors = require('../errors/all-errors');
const { errorUrl } = require('../utils/consts');

router.get('/*', (req, res, next) => {
  throw next(new AllErrors(errorUrl, 404));
});

module.exports = router;
