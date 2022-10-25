const jwt = require('jsonwebtoken');
const ServerError = require('../error/ServerError');
const UnauthorizedError = require('../error/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new UnauthorizedError('Отсутствует токен'));
    }
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new UnauthorizedError('Некорректный токен'));
    }
    return next(new ServerError('Ошибка сервера'));
  }
};
