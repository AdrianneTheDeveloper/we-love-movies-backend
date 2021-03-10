const MoviesService = require("./movies.service");
const asyncErrorBoundary = require(".././errors/errorBoundary");
const treeize = require("../utils/treeize");

async function list(req, res, next) {
  // Declare variable for query values
  const { is_showing } = req.query;
  // If req.query is true, wait for list of movies with is_showing === true
  if (is_showing === "true") {
    let movieList = await MoviesService.moviesAreShowing();
    movieList = treeize(movieList);
    res.json({ data: movieList });
  } else {
    // If req.query isn't true, list all movies
    let movieList = await MoviesService.getAllMovies();
    movieList = treeize(movieList);
    res.json({ data: movieList });
  }
}

async function movieExists(req, res, next) {
 
  // Declare variable for req.params
  const { movieId } = req.params;
  // Wait for movie that matches movieId
  const foundMovie = await MoviesService.getMovieById(movieId);
  const foundTheaters = await MoviesService.getAllTheaters(movieId);
  const foundReviewersAndCritics = await MoviesService.getReviewsAndCritics( movieId);
  const error = { status: 404, message: `Movie cannot be found.` };

  if (!movieId) return next({ status: 400, message: `No movieId given.` });
  // If there is a movie store movie locally
  if (foundMovie.length !== 0) {
    res.locals.movie = foundMovie[0];

    res.locals.theaters = foundTheaters;

    res.locals.reviewers = foundReviewersAndCritics;

    return next();
  } else {
    // Else return error
    next(error);
  }
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function findAllTheaters(req, res, next) {
 

  res.json({ data: res.locals.theaters });
}

async function findReviewsAndCritics(req, res, next) {
  let reviewers = treeize(res.locals.reviewers);
  res.json({ data: reviewers });
}
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  findAllTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(findAllTheaters),
  ],
  findReviewsAndCritics: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(findReviewsAndCritics),
  ],
};
