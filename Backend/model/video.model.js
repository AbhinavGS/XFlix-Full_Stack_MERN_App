const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"],
  },
  contentRating: {
    type: String,
    required: true,
    enum: ["Anyone", "7+", "12+", "16+", "18+"],
  },
  releaseDate: {
    type: String,
    required: true,
    trim: true,
  },
  previewImage: {
    type: String,
    required: true,
    trim: true,
  },
  votes: {
    upVotes: {
      type: String,
      default: "0",
    },
    downVotes: {
      type: String,
      default: "0",
    },
  },
  viewCount: {
    type: String,
    default: "0",
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports.Video = Video;
module.exports.videoSchema = videoSchema;
