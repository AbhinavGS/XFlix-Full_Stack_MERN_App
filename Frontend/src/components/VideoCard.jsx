import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useHistory, Link } from "react-router-dom";

import "./VideoCard.css";

const VideoCard = (props) => {
  const history = useHistory();

  return (
    <Card
      sx={{ boxShadow: 0 }}
      square={true}
      onClick={() => history.push(`/video/${props.id}`)}
    >
      <CardActionArea className="video-tile">
        <CardMedia
          component="img"
          height="140"
          image={props.previewImage}
          alt={props.title}
        />
        <CardContent
          style={{ backgroundColor: "#181818", color: "white", paddingLeft: 0 }}
        >
          <Typography gutterBottom variant="p" component="div">
            {props.title}
          </Typography>
          <Typography
            style={{ color: "white" }}
            variant="p"
            color="text.secondary"
          >
            {props.releaseDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
