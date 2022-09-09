const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const getVideos = catchAsync(async (req, res) => {
  const queryObject = req.query;
  // if query params are not provided, get all videos
  if (
    Object.keys(queryObject).length === 0 &&
    queryObject.constructor === Object
  ) {
    const videos = await videoService.getVideos();
    videos.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    res.send({ videos });
  } else {
    // if query params are provided, get filtered videos
    const videos = await videoService.getVideosByFilter(queryObject);

    if (queryObject.sortBy === "viewCount") {
      res.send({ videos });
    } else {
      // sort by release date by default
      videos.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      res.send({ videos });
    }
  }
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  res.send(video);
});

const postVideo = catchAsync(async (req, res) => {
  const video = await videoService.postVideo(req.body);
  if (!video) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to upload video, Please try again"
    );
  }
  res.send(video);
});

const patchVideoVotes = catchAsync((req, res) => {
  videoService.patchVideoVotes(req.params.videoId, req.body);
  res.status(204).send();
});

const patchVideoViews = catchAsync((req, res) => {
  videoService.patchVideoViews(req.params.videoId);
  res.status(204).send();
});

module.exports = {
  getVideos,
  getVideoById,
  postVideo,
  patchVideoVotes,
  patchVideoViews,
};
