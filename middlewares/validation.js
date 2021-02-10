const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'поле "name" обязательно для заполнения',
        'string.min': 'длина поля "name" не менее 2 символов',
        'string.max': 'длина поля "name" не более 30 символов',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.required': 'поле "email" обязательно для заполнения',
        'string.email': 'невалидный email',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.required': 'поле "password" обязательно для заполнения',
        'string.min': 'длина поля "password" не менее 8 символов',
      }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.required': 'поле "email" обязательно для заполнения',
        'string.email': 'невалидный email',
      }),
    password: Joi.string().required().min(8).messages({
      'string.required': 'поле "password" обязательно для заполнения',
      'string.min': 'длина поля "password" не менее 8 символов',
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailer: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required(),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

module.exports = {
  validateUserBody, validateAuth, validateUserUpdate, validateMoviePost, validateMovieDelete,
};
