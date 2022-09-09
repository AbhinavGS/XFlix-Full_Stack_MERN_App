const Joi = require("joi");

const schema = Joi.object().keys({
  vote: Joi.string()
    .valid("upVote", "downVote")
    .required(),
  change: Joi.string()
    .valid("increase", "decrease")
    .required(),
});

const getPatchVoteErrors = (req, res, next) => {
  const { vote, change } = req.body;
  const result = schema.validate({
    vote,
    change,
  });
  if (result.error) {
    return res.status(422).json(result.error);
  }
  return next();
};

module.exports = getPatchVoteErrors;
