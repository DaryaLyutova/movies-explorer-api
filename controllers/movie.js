const Movie = require('../models/movie');
const AllErrors = require('../errors/all-errors');
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
        next(new AllErrors(errorReq, 400));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner')
    .orFail(new AllErrors(errorMovie, 404))
    .then((movie) => {
      if ((movie.owner._id).toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((trueMovie) => res.send(trueMovie));
      }
      throw new AllErrors(errorRight, 403);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors(errorId, 400));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
