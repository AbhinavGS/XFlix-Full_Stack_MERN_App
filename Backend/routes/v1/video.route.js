const express = require("express");
const {
  validate,
  getQueryErrors,
  getBodyErrors,
  getPatchVoteErrors,
} = require("../../middlewares");
const videoValidation = require("../../validations/video.validation");
const videoController = require("../../controller/videoController");

const router = express.Router();

router.get("/", getQueryErrors, videoController.getVideos);
router.get(
  "/:videoId",
  validate(videoValidation.getVideoById),
  videoController.getVideoById
);
router.post("/", getBodyErrors, videoController.postVideo);

router.patch(
  "/:videoId/votes",
  validate(videoValidation.getVideoById),
  getPatchVoteErrors,
  videoController.patchVideoVotes
);

router.patch(
  "/:videoId/views",
  validate(videoValidation.getVideoById),
  videoController.patchVideoViews
);

module.exports = router;
