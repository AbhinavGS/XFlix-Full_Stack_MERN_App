const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

const PORT = config.port;
const DB_URI = config.mongoose.url;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Connected to database at ${DB_URI} ...`);
  })
  .catch((err) => {
    console.log(
      `Could not connect to database at ${DB_URI} because of ${err.message}`
    );
  });

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
