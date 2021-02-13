const Movie = require('../models/movie');
const AllErrors = require('../errors/all-errors');

const getMovies = (req, res, next) => {
  Movie.find({ movieId: req.user._id }).populate('owner')
    .then((movies) => {
      return res.status(200).send(movies);
    })
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
        next(new AllErrors('Переданы некорректные данные', 400));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner')
    .orFail(new AllErrors('Данный фильм отсутствует', 404))
    .then((movie) => {
      if ((movie.owner._id).toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((trueMovie) => {
            return res.send(trueMovie);
          });
      }
      throw new AllErrors('Нет прав на удаление данного фильма', 403);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AllErrors('Невалидный id', 400));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
