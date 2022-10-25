const Card = require('../models/cards');
const ServerError = require('../error/ServerError');
const NotFoundError = require('../error/NotFoundError');
const ValidationError = require('../error/ValidationError');
const ForbiddenError = require('../error/ForbiddenError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Неправильный ввод данных'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Карточки с таким id не сущестует')))
    .then((cards) => {
      if (!cards.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалять чужие карточки'));
      }
      return cards.remove()
        .then(() => res.send(cards));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Получен неверный ID'));
      }
      return next(new ServerError('Ошибка на сервере'));
    });
};
