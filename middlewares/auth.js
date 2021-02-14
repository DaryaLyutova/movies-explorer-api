const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AllErrors = require('../errors/all-errors');
const { errorAuth } = require('../utils/consts');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw next(new AllErrors(errorAuth, 401));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AllErrors(errorAuth, 401));
    return next(err);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
