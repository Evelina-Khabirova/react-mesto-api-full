require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  SALT_ROUNDS,
} = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const ServerError = require('../error/ServerError');
const NotFoundError = require('../error/NotFoundError');
const UnauthorizedError = require('../error/UnauthorizedError');
const ValidationError = require('../error/ValidationError');
const ConflictError = require('../error/ConflictError');

module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.getProfile = (req, res, next) => {
  Users.findById(req.user._id)
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.getProfileId = (req, res, next) => {
  Users.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.registerProfile = (req, res, next) => {
  const {
    name,
    email,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(req.body.password, NODE_ENV === 'production' ? Number(SALT_ROUNDS) : 10)
    .then((password) => {
      Users.create({
        name,
        email,
        password,
        about,
        avatar,
      })
        .then((user) => res.send(user.toJSON()))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            return next(new ValidationError('Неправильный ввод данных'));
          }
          return next(new ServerError('Ошибка на сервере'));
        });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.loginProfile = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((users) => {
      if (!users) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      return bcrypt.compare(password, users.password, (error, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError('Неверный пароль'));
        }
        const token = jwt.sign({ _id: users._id }, (NODE_ENV === 'production') ? JWT_SECRET : 'secret', { expiresIn: '7d' });
        return res.send({ token }).end();
      });
    })
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.editProfileInformation = (req, res, next) => {
  Users.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Неправильный ввод данных'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.editProfileAvatar = (req, res, next) => {
  Users.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Неправильный ввод данных'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};
