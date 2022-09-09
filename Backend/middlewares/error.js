// Send response on errors
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  console.error(err);

  res.status(statusCode).send(response);
};

module.exports = errorHandler;
