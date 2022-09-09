const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Video } = require("../model");

const getVideos = async () => {
  return Video.find({});
};

const getVideoById = async (id) => {
  return Video.findById(id);
};

const getVideosByFilter = async (filter) => {
  const { title, genres, contentRating, sortBy } = filter;
  const genreList = genres && genres.split(",");
  const query = {};

  if (title) {
    query.title = { $regex: new RegExp(title, "i") };
  }
  if (genres) {
    query.genre = { $in: genreList };
  }
  if (contentRating) {
    if (contentRating === "18+") query.contentRating = { $in: ["18+"] };
    if (contentRating === "16+") query.contentRating = { $in: ["16+", "18+"] };
    if (contentRating === "12+")
      query.contentRating = { $in: ["12+", "16+", "18+"] };
    if (contentRating === "7+")
      query.contentRating = { $in: ["7+", "12+", "16+", "18+"] };
    if (contentRating === "Anyone")
      query.contentRating = { $in: ["Anyone", "7+", "12+", "16+", "18+"] };
  }

  if (sortBy === "viewCount") {
    return Video.find(query)
      .sort({ viewCount: -1 })
      .collation({ locale: "en_US", numericOrdering: true });
  }
  return Video.find(query);
};

const postVideo = (data) => {
  const video = new Video(data);
  return video.save();
};

const patchVideoVotes = async (id, body) => {
  try {
    if (body.vote === "upVote") {
      const data = await Video.findOne({ _id: id }).select("votes.upVotes");
      const prevVal = Number(data.votes.upVotes);
      if (body.change === "increase") {
        return Video.updateOne({ _id: id }, { "votes.upVotes": prevVal + 1 });
      }
      if (body.change === "decrease") {
        return Video.updateOne({ _id: id }, { "votes.upVotes": prevVal - 1 });
      }
    }
    if (body.vote === "downVote") {
      const data = await Video.findOne({ _id: id }).select("votes.downVotes");
      const prevVal = Number(data.votes.downVotes);
      if (body.change === "increase") {
        return Video.updateOne({ _id: id }, { "votes.downVotes": prevVal + 1 });
      }
      if (body.change === "decrease") {
        return Video.updateOne({ _id: id }, { "votes.downVotes": prevVal - 1 });
      }
    }
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
};

const patchVideoViews = async (id) => {
  try {
    const data = await Video.findOne({ _id: id }).select("viewCount");
    const prevVal = Number(data.viewCount);
    return Video.updateOne({ _id: id }, { viewCount: prevVal + 1 });
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
};

module.exports = {
  getVideoById,
  getVideos,
  getVideosByFilter,
  postVideo,
  patchVideoVotes,
  patchVideoViews,
};
