const Joi = require("joi");

const schema = Joi.object().keys({
  videoLink: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.string()
    .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All")
    .required(),
  contentRating: Joi.string()
    .valid("Anyone", "7+", "12+", "16+", "18+")
    .required(),
  releaseDate: Joi.string().required(),
  previewImage: Joi.string().required(),
});

const getBodyErrors = (req, res, next) => {
  const {
    videoLink,
    title,
    genre,
    contentRating,
    releaseDate,
    previewImage,
  } = req.body;
  const result = schema.validate({
    videoLink,
    title,
    genre,
    contentRating,
    releaseDate,
    previewImage,
  });
  if (result.error) {
    return res.status(422).json(result.error);
  }
  return next();
};

module.exports = getBodyErrors;
