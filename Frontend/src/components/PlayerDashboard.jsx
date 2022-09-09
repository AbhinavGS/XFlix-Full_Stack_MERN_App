import React, { useEffect } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import moment from "moment";

import { Grid, Box } from "@mui/material";

import "./Dashboard.css";

const PlayerDashboard = ({ videos, setVideos }) => {
  const URL = process.env.REACT_APP_SERVER;

  const fetchVideos = async (URL) => {
    const res = await axios.get(`${URL}/v1/videos`);
    const videoList = res.data.videos;
    setVideos(videoList);
  };

  useEffect(() => fetchVideos(URL), []);

  return (
    <Box className="dashboard__container">
      <Grid container spacing={2}>
        {videos.map((video) => {
          const {
            _id,
            previewImage,
            title,
            releaseDate,
            videoLink,
            viewCount,
            genre,
          } = video;
          return (
            <Grid item xs={12} md={3} key={_id}>
              <VideoCard
                className="video-tile-link"
                previewImage={previewImage}
                title={title}
                releaseDate={moment(releaseDate, "DDMMMYYYY").fromNow()}
                id={_id}
                videoLink={videoLink}
                viewCount={viewCount}
                genre={genre}
                releaseDateOriginal={releaseDate}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PlayerDashboard;
