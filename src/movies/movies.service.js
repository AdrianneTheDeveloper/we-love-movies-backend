const knex = require("../db/connection");



// Select all movies
const getAllMovies = () =>
  knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "r.review_id as reviews:id",
      "r.content as reviews:content",
      "r.score as reviews:score",
      "r.critic_id as reviews:critic_id",
      "r.movie_id as reviews:movie_id"
    );

// Select all movies with is_showing as true
const moviesAreShowing = () =>
  knex("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "r.review_id as reviews:id",
      "r.content as reviews:content",
      "r.score as reviews:score",
      "r.critic_id as reviews:critic_id",
      "r.movie_id as reviews:movie_id"
    )
    .where({ "mt.is_showing": true });

// Select all movies where movie id === param
const getMovieById = (movieId) =>
  knex("movies").select("*").where({ movie_id: movieId });

const getAllTheaters = (movieId) => {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at",
      "mt.is_showing",
      "m.movie_id"
    )
    .where({ "m.movie_id": movieId });
};

const getReviewsAndCritics = (movieId) => {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name",
      "c.created_at as critic:created_at",
      "c.updated_at as critic:updated_at"
    )
    .where({ "m.movie_id": movieId });
};
module.exports = {
  getAllMovies,
  moviesAreShowing,
  getMovieById,
  getAllTheaters,
  getReviewsAndCritics
};
