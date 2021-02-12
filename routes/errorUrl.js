const router = require('express').Router();

router.get('/*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  return next();
});

module.exports = router;
