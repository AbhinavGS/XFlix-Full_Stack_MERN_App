import React, { useState } from "react";
import Header from "./Header";
import PlayerDashboard from "./PlayerDashboard";
import VideoPlayer from "./VideoPlayer";

import "./VideoPlayerPage";

const VideoPlayerPage = () => {
  const [videos, setVideos] = useState([]);

  const videoId = window.location.pathname.split("/")[2];

  return (
    <div>
      <Header onlyLogo={true} />
      <VideoPlayer videoId={videoId} />
      <PlayerDashboard videos={videos} setVideos={setVideos} />
    </div>
  );
};

export default VideoPlayerPage;
