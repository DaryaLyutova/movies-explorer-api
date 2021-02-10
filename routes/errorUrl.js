const router = require('express').Router();
const AllErrors = require('../errors/all-errors');

router.get('/*', (req, res, next) => {
  next(new AllErrors({ message: 'Запрашиваемый ресурс не найден' }, 404));
});

module.exports = router;
