const router = require('express').Router();
const { validateMoviePost, validateMovieDelete } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/movies', getMovies);

router.post('/movies', validateMoviePost, createMovie);

router.delete('/movies/:movieId', validateMovieDelete, deleteMovie);

module.exports = router;
