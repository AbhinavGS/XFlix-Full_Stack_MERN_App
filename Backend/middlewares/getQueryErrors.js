const Joi = require("joi");

const { validGenres } = require("../validations/custom.validation");

const schema = Joi.object().keys({
  title: Joi.string(),
  genres: Joi.string().custom(validGenres),
  contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
  sortBy: Joi.string().valid("viewCount", "releaseDate"),
});

const getQueryErrors = (req, res, next) => {
  const { title, genres, contentRating, sortBy } = req.query;
  const result = schema.validate({ title, genres, contentRating, sortBy });
  if (result.error) {
    return res.status(422).json(result.error);
  }
  return next();
};

module.exports = getQueryErrors;
