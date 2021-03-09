const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');
Joi.objectId = require('joi-objectid')(Joi);

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'поле "name" должно быть \'текстом\'',
        'string.empty': 'поле "name" не должно быть пустым',
        'string.min': 'поле "name" должно быть не менее {#limit}',
        'string.max': 'поле "name" должно быть не более {#limit}',
        'any.required': 'поле "name" обязательно для заполнения',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.base': 'поле "email" должно быть \'текстом\'',
        'string.empty': 'поле "email" не должно быть пустым',
        'string.email': 'не валидный "email"',
        'any.required': 'поле "email" обязательно для заполнения',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'поле "password" не должно быть пустым',
        'string.min': 'поле "password" не должно быть меньше {#limit}',
        'any.required': 'поле "password" обязательно для заполнения',
      }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'поле "email" не должно быть пустым',
        'string.email': 'не валидный "email"',
        'any.required': 'поле "email" обязательно для заполнения',
      }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'поле "password" не должно быть пустым',
      'string.min': 'поле "password" не должно быть меньше {#limit}',
      'any.required': 'поле "password" обязательно для заполнения',
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'поле "name" должно быть \'текстом\'',
        'string.empty': 'поле "name" не должно быть пустым',
        'string.min': 'поле "name" должно быть не менее {#limit}',
        'string.max': 'поле "name" должно быть не более {#limit}',
        'any.required': 'поле "name" обязательно для заполнения',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.base': 'поле "email" должно быть \'текстом\'',
        'string.empty': 'поле "email" не должно быть пустым',
        'string.email': 'не валидный "email"',
        'any.required': 'поле "email" обязательно для заполнения',
      }),
  }),
});

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().default('Неизвестно')
      .messages({
        'string.base': 'поле "country" должно быть \'текстом\'',
        'string.empty': 'поле "country" не должно быть пустым',
        'any.required': 'поле "country" обязательно для заполнения',
      }),
    director: Joi.string().required().default('Неизвестно')
      .messages({
        'string.base': 'поле "director" должно быть \'текстом\'',
        'string.empty': 'поле "director" не должно быть пустым',
        'any.required': 'поле "director" обязательно для заполнения',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'поле "duration" должно быть \'числом\'',
        'number.empty': 'поле "duration" не должно быть пустым',
        'any.required': 'поле "duration" обязательно для заполнения',
      }),
    year: Joi.string().required().default('Неизвестно')
      .messages({
        'string.base': 'поле "year" должно быть \'текстом\'',
        'string.empty': 'поле "year" не должно быть пустым',
        'any.required': 'поле "year" обязательно для заполнения',
      }),
    description: Joi.string().required().default('Неизвестно')
      .messages({
        'string.base': 'поле "description" должно быть \'текстом\'',
        'string.empty': 'поле "description" не должно быть пустым',
        'any.required': 'поле "description" обязательно для заполнения',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      } return helpers.message('Поле "image" должно быть валидным url-адресом');
    }).default('https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158')
      .messages({
        'string.empty': 'поле "image" не должно быть пустым',
        'any.required': 'поле "image" обязательно для заполнения',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      } return helpers.message('Поле " trailer" должно быть валидным url-адресом');
    }).default('https://www.youtube.com/')
      .messages({
        'string.empty': 'поле "trailer" не должно быть пустым',
        'any.required': 'поле "trailer" обязательно для заполнения',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.base': 'поле "nameRU" должно быть \'текстом\'',
        'string.empty': 'поле "nameRU" не должно быть пустым',
        'any.required': 'поле "nameRU" обязательно для заполнения',
      }),
    nameEN: Joi.string().required().default('Unknown')
      .messages({
        'string.base': 'поле "nameEN" должно быть \'текстом\'',
        'string.empty': 'поле "nameEN" не должно быть пустым',
        'any.required': 'поле "nameEN" обязательно для заполнения',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      } return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    }).default('https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158')
      .messages({
        'string.empty': 'поле "thumbnail" не должно быть пустым',
        'any.required': 'поле "thumbnail" обязательно для заполнения',
      }),
    movieId: Joi.number().required().messages({
      'number.base': 'поле "movieId" должно быть \'числом\'',
      'string.empty': 'поле "movieId" не должно быть пустым',
      'any.required': 'поле "movieId" обязательно для заполнения',
    }),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId()
      .messages({
        'string.empty': 'поле "movieId" не должно быть пустым',
      }),
  }),
});

module.exports = {
  validateUserBody, validateAuth, validateUserUpdate, validateMoviePost, validateMovieDelete,
};
