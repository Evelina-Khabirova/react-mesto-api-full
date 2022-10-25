const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateLink = (value, helpers) => {
  if (!/https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validateId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateId),
  }),
});

module.exports.validateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateLink),
  }),
});

module.exports.validateCreateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateLink),
  }),
});
