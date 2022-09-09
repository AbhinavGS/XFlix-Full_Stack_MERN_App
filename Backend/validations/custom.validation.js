const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const validGenres = (value, helpers) => {
  const listOfValidGenres = [
    "Education",
    "Sports",
    "Movies",
    "Comedy",
    "Lifestyle",
    "All",
  ];
  const listOfGenres = value.split(",");
  let valid = true;

  listOfGenres.forEach((genre) => {
    if (!listOfValidGenres.includes(genre)) {
      valid = false;
    }
  });

  if (!valid) {
    return helpers.message('"{{#label}}" must be valid genre(s)');
  }
  return value;
};

module.exports = {
  objectId,
  validGenres,
};
