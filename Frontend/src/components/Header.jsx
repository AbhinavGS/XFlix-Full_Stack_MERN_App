import React, { useState } from "react";

import {
  Stack,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { MdUpload } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import UploadModalForm from "./UploadModalForm";
import axios from "axios";

import "./Header.css";

const Header = ({ onlyLogo, setVideos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const SimpleDialog = (props) => {
    return (
      <Dialog
        open={isModalOpen}
        PaperProps={{
          style: {
            backgroundColor: "#2c2c2c",
            color: "white",
          },
        }}
      >
        <DialogTitle>Upload Video</DialogTitle>
        <UploadModalForm handleModal={handleModal} />
      </Dialog>
    );
  };

  /////////////////////////////////////////////////////////////////////////////////////////////

  const updateDebounceText = debounce(async (text) => {
    let URL;
    if (text === "") {
      URL = `${process.env.REACT_APP_SERVER}/v1/videos`;
    } else {
      URL = `${process.env.REACT_APP_SERVER}/v1/videos?title=${text}`;
    }
    const result = await axios.get(URL);

    setVideos(result.data.videos);
  }, 1000);

  function debounce(cb, delay = 1000) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box className="header__container">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <img src="xflixlogo.svg" alt="XFlix-icon"></img>
        </Box>
        {!onlyLogo && (
          <>
            <Box className="header__search-bar">
              <Stack direction="row">
                <TextField
                  fullwidth="true"
                  sx={{ input: { color: "white" } }}
                  className="header__search-text"
                  size="small"
                  placeholder="Search"
                  name="search"
                  onChange={(e) => updateDebounceText(e.target.value)}
                />
                <Button className="header__search-icon">
                  <BiSearchAlt2 size={25} color={"#606060"} />
                </Button>
              </Stack>
            </Box>
            <Box>
              <Button
                onClick={handleModal}
                variant="contained"
                style={{
                  backgroundColor: "#4CA3FC",
                  textTransform: "none",
                }}
              >
                <MdUpload size={20} /> &nbsp;Upload
              </Button>
            </Box>
          </>
        )}
      </Stack>
      <SimpleDialog open={isModalOpen} className="header__dialog-modal" />
    </Box>
  );
};

export default Header;
