import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Stack, Chip, Typography } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { VscDebugStackframeDot } from "react-icons/vsc";

import "./VideoPlayer.css";

const VideoPlayer = ({ videoId }) => {
  const [videoData, setVideoData] = useState({});
  const [videoURL, setVideoURL] = useState("");
  const [votes, setVotes] = useState({ upVotes: "0", downVotes: "0" });

  const getVideoDetailsById = async (videoId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/v1/videos/${videoId}`
    );
    setVideoURL(`https://www.${res.data.videoLink}`);
    setVideoData(res.data);
    setVotes(res.data.votes);
  };
  useEffect(() => getVideoDetailsById(videoId), [videoId]);

  const handleVotes = async (type) => {
    const body = {
      vote: `${type}`,
      change: `increase`,
    };
    const URL = `${process.env.REACT_APP_SERVER}/v1/videos/${videoId}/votes`;
    axios.patch(URL, body).then(() => {
      if (type === "upVote") {
        const newVote = Number(votes.upVotes) + 1;
        setVotes((prevValue) => ({ ...prevValue, upVotes: newVote }));
      }
      if (type === "downVote") {
        const newVote = Number(votes.downVotes) + 1;
        setVotes((prevValue) => ({ ...prevValue, downVotes: newVote }));
      }
    });
  };

  const handleViews = async () => {
    const URL = `${process.env.REACT_APP_SERVER}/v1/videos/${videoId}/views`;
    await axios.patch(URL);
  };

  useEffect(() => handleViews(), []);

  return (
    <Box className="video-player-container">
      <div className="video-player">
        <iframe
          title="title"
          className="responsive-iframe"
          src={`${videoURL}?autoplay=1`}
          allow="autoplay"
        ></iframe>
        <Stack
          direction="row"
          className="video-player-info-container"
          justifyContent="space-between"
        >
          <Stack direction="column">
            <Box>
              <Typography variant="h6">{videoData.title}</Typography>
            </Box>
            <Box>
              {videoData.viewCount} views
              <VscDebugStackframeDot className="separator-dot" />
              {videoData.genre}
              <VscDebugStackframeDot className="separator-dot" />
              {videoData.releaseDate}
            </Box>
          </Stack>
          <Stack direction="row" alignItems={"center"}>
            <Chip
              style={{ backgroundColor: "#313131", color: "white" }}
              icon={<FaThumbsUp color="#797979" />}
              label={votes.upVotes}
              onClick={() => handleVotes("upVote")}
            />
            &nbsp; &nbsp;
            <Chip
              style={{ backgroundColor: "#313131", color: "white" }}
              icon={<FaThumbsDown color="#797979" />}
              label={votes.downVotes}
              onClick={() => handleVotes("downVote")}
            />
          </Stack>
        </Stack>
      </div>
    </Box>
  );
};

export default VideoPlayer;
