const mongoose = require('mongoose');
const validator = require('validator');
const { errorReq } = require('../utils/consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    default: 'Неизвестно',
    required: true,
  },
  director: {
    type: String,
    default: 'Неизвестно',
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    default: 'Неизвестно',
    required: true,
  },
  description: {
    type: String,
    default: 'Неизвестно',
    required: true,
  },
  image: {
    type: String,
    default: 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorReq,
    },
  },
  trailer: {
    type: String,
    default: 'https://www.youtube.com/',
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorReq,
    },
  },
  thumbnail: {
    type: String,
    default: 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorReq,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    default: 'Неизвестно',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
