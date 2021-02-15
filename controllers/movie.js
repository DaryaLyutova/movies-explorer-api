const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadReqError = require('../errors/BadReqError');
const NoRightError = require('../errors/NoRightError');
const IdError = require('../errors/IdError');

const {
  errorReq, errorMovie, errorRight, errorId,
} = require('../utils/consts');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).populate('owner')
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => { res.send(movie); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError(errorReq));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner')
    .orFail(new NotFoundError(errorMovie))
    .then((movie) => {
      if ((movie.owner._id).toString() === req.user._id) {
        return movie.remove()
          .then((trueMovie) => res.send(trueMovie));
      }
      throw new NoRightError(errorRight);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IdError(errorId));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
