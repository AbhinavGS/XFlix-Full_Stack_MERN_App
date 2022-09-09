import React, { useState } from "react";
import axios from "axios";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import "./UploadModalForm.css";

const UploadModalForm = ({ handleModal }) => {
  const [formData, setFormData] = useState({
    videoLink: "",
    thumbnailLink: "",
    title: "",
    genre: "",
    age: "",
    releaseDate: "",
  });
  const genres = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
  const ages = ["Any", "7+", "12+", "16+", "18+"];

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const options = { year: "numeric", month: "short", day: "numeric" };

    return date.toLocaleDateString("en-IN", options);
  };

  const sendFormData = async () => {
    formData.releaseDate = formatDate(formData.releaseDate);

    const result = await axios.post(
      `${process.env.REACT_APP_SERVER}/v1/videos`,
      formData
    );
    console.log(result);
    handleModal();
  };

  return (
    <>
      <Stack spacing={1} className="Modal-Form-container">
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          className="Modal-Form-field"
          id="outlined-basic"
          name="videoLink"
          label="Video Link"
          variant="outlined"
          helperText="This link will be used to derive the video"
          required
          size="small"
          value={formData.videoLink}
          onChange={handleChange}
        />
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          id="outlined-basic"
          name="thumbnailLink"
          label="Thumbnail Image Link"
          variant="outlined"
          helperText="This link will be used to preview the thumbnail image"
          size="small"
          required
          value={formData.thumbnailLink}
          onChange={handleChange}
        />
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          id="outlined-basic"
          name="title"
          label="Title"
          variant="outlined"
          helperText="The title will be the representative text for video"
          size="small"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          id="outlined-select-genre"
          name="genre"
          select
          label="Genre"
          helperText="Genre will help in categorizing your videos"
          size="small"
          required
          value={formData.genre}
          onChange={handleChange}
        >
          {genres.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          id="outlined-select-age"
          name="age"
          select
          label="Age"
          helperText="This will be used to filter videos on age group suitability"
          size="small"
          required
          value={formData.age}
          onChange={handleChange}
        >
          {ages.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{
            "& .MuiInputLabel-root": { color: "darkgray" },
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "darkgray" },
            },
            input: { color: "darkgray" },
          }}
          id="date"
          name="releaseDate"
          label="Release Date"
          type="date"
          helperText="This will be used to sort videos"
          size="small"
          required
          value={formData.releaseDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Stack direction="row">
          <Button
            color="error"
            variant="contained"
            onClick={sendFormData}
            style={{ textTransform: "none" }}
          >
            Submit
          </Button>
          <Button onClick={handleModal} style={{ textTransform: "none" }}>
            {" "}
            Cancel
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default UploadModalForm;
