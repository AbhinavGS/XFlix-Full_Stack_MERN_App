import React from "react";

import { Stack, Box, Chip } from "@mui/material";
import { BiSortAlt2 } from "react-icons/bi";

import "./GenrePanel.css";

const GenrePanel = ({
  genre,
  sort,
  age,
  handleGenreChange,
  handleSortChange,
  handleAgeChange,
}) => {
  return (
    <Box className="genre-panel__container">
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="genre-panel-genre-stack"
      >
        <Chip
          className={
            genre.length === 0 ? `genre-pills active-pill` : "genre-pills"
          }
          onClick={handleGenreChange}
          label="All Genre"
        >
          <button></button>
        </Chip>

        <Chip
          className={
            genre.includes("Education")
              ? `genre-pills active-pill`
              : "genre-pills"
          }
          onClick={handleGenreChange}
          label="Education"
        >
          <button></button>
        </Chip>

        <Chip
          className={
            genre.includes("Sports") ? `genre-pills active-pill` : "genre-pills"
          }
          onClick={handleGenreChange}
          label="Sports"
        >
          <button></button>
        </Chip>
        <Chip
          className={
            genre.includes("Comedy") ? `genre-pills active-pill` : "genre-pills"
          }
          onClick={handleGenreChange}
          label="Comedy"
        >
          <button></button>
        </Chip>
        <Chip
          className={
            genre.includes("Lifestyle")
              ? `genre-pills active-pill`
              : "genre-pills"
          }
          onClick={handleGenreChange}
          label="Lifestyle"
        >
          <button></button>
        </Chip>

        <Box className="genre-panel-sort">
          <Stack direction="row" className="temp">
            <BiSortAlt2 size={20} />
            Sort By: &nbsp;
            <select
              name="sortby"
              id="sortby"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="viewCount">View Count</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </Stack>
        </Box>
      </Stack>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="genre-panel-age-stack"
      >
        <Chip
          className={age === "0+" ? `genre-pills active-pill` : "genre-pills"}
          id="0+"
          onClick={handleAgeChange}
          label="Any Age Group"
        >
          <button></button>
        </Chip>
        <Chip
          className={age === "7+" ? `genre-pills active-pill` : "genre-pills"}
          id="7+"
          onClick={handleAgeChange}
          label="7+"
        >
          <button></button>
        </Chip>
        <Chip
          className={age === "12+" ? `genre-pills active-pill` : "genre-pills"}
          id="12+"
          onClick={handleAgeChange}
          label="12+"
        >
          <button></button>
        </Chip>
        <Chip
          className={age === "16+" ? `genre-pills active-pill` : "genre-pills"}
          id="16+"
          onClick={handleAgeChange}
          label="16+"
        >
          <button></button>
        </Chip>
        <Chip
          className={age === "18+" ? `genre-pills active-pill` : "genre-pills"}
          id="18+"
          onClick={handleAgeChange}
          label="18+"
        >
          <button></button>
        </Chip>
      </Stack>
    </Box>
  );
};

export default GenrePanel;
